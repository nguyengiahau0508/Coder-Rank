import {Component, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MarkdownEditorComponent} from '../../shared/components/markdown-editor/markdown-editor.component';
import {MarkdownPreviewComponent} from '../../shared/components/markdown-preview/markdown-preview.component';
import {ProblemsService} from '../../core/services/problems.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Problem} from '../../core/models/problem.model';
import {TitleService} from '../../core/services/shared/title.service';
import {SubmissionsService} from '../../core/services/submissions.service';
import {SharedService} from '../../core/services/shared/shared.service';
import {User} from '../../core/models/user.model';
import {Submission} from '../../core/models/submission.model';
import {SolutionsService} from '../../core/services/solutions.service';
import {Tag} from '../../core/models/tag.model';
import {TagsService} from '../../core/services/tags.service';
import {Solution} from '../../core/models/solutions.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-post-solution',
  imports: [
    ReactiveFormsModule,
    MarkdownEditorComponent,
    MarkdownPreviewComponent,
    FormsModule
  ],
  templateUrl: './post-solution.component.html',
  styleUrl: './post-solution.component.css',
  standalone: true
})
export class ProblemPostSolutionComponent {
  solotuion = signal<Partial<Solution>>({});
  selectedTags: Tag[] = [];

  problem = signal<Problem | null>(null);
  submission = signal<Submission | null>(null);
  markdownForm?: FormGroup;
  content: string = '';
  user: User | null = null;
  isPreviewMode = signal(false);
  tags = signal<Tag[]>([]);



  constructor(
    private fb: FormBuilder,
    private problemsService: ProblemsService,
    private route: ActivatedRoute,
    private title: TitleService,
    private submissionService: SubmissionsService,
    private sharedService: SharedService,
    private tagsService: TagsService,
    private solutionService: SolutionsService,
    private readonly router: Router,
    private readonly toarst: ToastrService
  ) {
    const problemId = Number(this.route.snapshot.paramMap.get('problemId')!);
    this.problemsService.getProblemById(problemId).subscribe(response => {
      if (response) {
        this.problem.set(response.data);
        this.title.setTitle(this.problem()!.title + ' - ' + 'New Solution');
      } else {
        console.error('Problem not found');
      }
    });
  }

  ngOnInit() {
    this.sharedService.globalUser$.subscribe(value => {
      this.user = value;
    });

    this.loadSubmission();
    this.loadTags();

    this.markdownForm = this.fb.group({
      description: ["", Validators.required]
    });
  }

  loadSubmission() {
    const problemId = Number(this.route.snapshot.paramMap.get('problemId')!);
    this.submissionService.getLastSumissionCorrectByProblemId(problemId).subscribe({
      next: (response) => {
        this.submission.set(response.data);
      },
      error: (error) => {
        console.error('Error fetching submission:', error);
      }
    });
  }

  loadTags() {
    this.tagsService.getTags().subscribe({
      next: (response) => {
        this.tags.set(response.data);
      },
      error: (error) => {
        console.error('Error fetching tags:', error);
      }
    });
  }

  onTagsChange() {
    this.solotuion.set({
      ...this.solotuion(),
      tags: [...this.selectedTags]
    });
  }

  removeTag(tagToRemove: Tag) {
    this.selectedTags = this.selectedTags.filter(tag => tag.id !== tagToRemove.id);
    this.solotuion.set({
      ...this.solotuion(),
      tags: this.selectedTags
    });
  }

  get descriptionControl() {
    return this.markdownForm?.get("description") as FormControl;
  }

  onChangeContent(content: string) {
    this.content = content;
    this.solotuion.set({
      ...this.solotuion(),
      content: content,
    });
  }

  togglePreview() {
    this.isPreviewMode.set(!this.isPreviewMode());
  }

  submitSolution() {
    if (!this.solotuion().content || !this.solotuion().title) {
      this.toarst.error("Vui lòng nhập đầu đủ yêu cầu!", "Thất bại")
      return;
    }
    // Implement solution submission logic here
    this.solotuion.set({
      ...this.solotuion(),
      problem: this.problem()!,
    });
    const problemId = Number(this.route.snapshot.paramMap.get('problemId')!);
    this.solutionService.createSolution(this.solotuion()!).subscribe({
      next: (response) => {
        this.toarst.success("Chia sẽ giải pháp thành công", "Thành công")
        console.log('Solution submitted successfully:', response);
        this.router.navigate([`/problems/${problemId}/solutions`])
      },
      error: (error) => {
        console.error('Error submitting solution:', error);
      }
    });
  }
}
