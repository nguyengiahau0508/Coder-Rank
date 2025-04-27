import { Component, OnInit, signal } from '@angular/core';
import { Status, Submission } from '../../core/models/submission.model';
import { User } from '../../core/models/user.model';
import { SharedService } from '../../core/services/shared/shared.service';
import { SubmissionsService } from '../../core/services/submissions.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TabNavigationComponent } from '../../shared/components/tab-navigation/tab-navigation.component';
import { SubmissionDetailComponent } from '../../shared/components/submissions/submission-detail/submission-detail.component';
import { PageMeta } from '../../core/models/page-meta.model';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-my-problem-submission',
  templateUrl: './my-problem-submission.component.html',
  styleUrls: ['./my-problem-submission.component.css'], // Fix: 'styleUrl' should be 'styleUrls'
  imports: [
    DatePipe,
    TabNavigationComponent,
    SubmissionDetailComponent,
    PaginationComponent
  ]
})
export class MyProblemSubmissionComponent implements OnInit {
  user = signal<User | null>(null)
  submissions = signal<Submission[] | null>(null)
  problemId = signal<number | null>(null)
  selectedSubmission = signal<Submission | null>(null)
  meta = signal<PageMeta>({
    page: 1, take: 20, itemCount: 0, pageCount: 0, hasNextPage: false, hasPreviousPage: false
  })

  constructor(
    private readonly sharedService: SharedService,
    private readonly submissionsService: SubmissionsService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadSubmission()
  }

  loadSubmission() {
    this.sharedService.globalUser$.subscribe(value => {
      this.user.set(value);
      if (value) {
        this.problemId.set(Number(this.route.snapshot.paramMap.get('problemId')!));
        this.submissionsService.getUserSubmissionForProblem(value.id, this.problemId()!, this.meta().page, this.meta().take).subscribe({
          next: (response) => {
            this.submissions.set(response.data);
            this.meta.set(response.meta)
          },
          error: (error) => console.log(error)
        });
      }
    });
  }

  onPageChange(page: number) {
    this.meta.set({
      ...this.meta(),
      page: page
    })
    this.loadSubmission()
  }

  // Function to format status for display
  formatStatus(status: Status): string {
    switch (status) {
      case Status.PENDING: return 'Pending';
      case Status.ACCEPTED: return 'Accepted';
      case Status.WRONG_ANSWER: return 'Wrong Answer';
      case Status.TIME_LIMIT_EXCEEDED: return 'Time Limit Exceeded';
      case Status.MEMORY_LIMIT_EXCEEDED: return 'Memory Limit Exceeded';
      case Status.RUNTIME_ERROR: return 'Runtime Error';
      case Status.COMPILATION_ERROR: return 'Compilation Error';
      default: return status;
    }
  }

  viewDetail(submissionId: number) {
    this.submissionsService.getUserSubmissionDetailForProblem(this.user()!.id, submissionId).subscribe({
      next: (response) => {
        this.selectedSubmission.set(response.data)
      },
      error: (error) => console.log(error)
    })
  }

  onCancelViewDetail() {
    this.selectedSubmission.set(null)
  }
}
