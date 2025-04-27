import { Component, signal } from '@angular/core';
import { LoadingComponent } from '../../../shareds/components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { Contest } from '../models/contest.model';
import { Problem } from '../../problems/models/problem.models';
import { Editor } from 'ngx-editor';
import { ProblemsService } from '../../problems/services/problems.service';
import { ContestsService } from '../services/contests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TextEditorComponent } from '../../../shareds/components/text-editor/text-editor.component';

@Component({
  selector: 'app-edit',
  imports: [
    LoadingComponent,
    FormsModule,
    TextEditorComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  isLoading = signal<boolean>(false);
  contest = signal<Contest | null>(null)

  duration = signal<number | null>(null);
  fileSelected = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  problems = signal<Problem[]>([])
  availableProblems = signal<Problem[]>([]);
  initialProblems = signal<Problem[]>([]);
  searchTerm = signal<string>('');

  descriptionEditor = new Editor();

  constructor(
    private readonly problemsService: ProblemsService,
    private readonly contestsService: ContestsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toarst: ToastrService
  ) {
    this.loadContest();
    this.loadProblems();
  }

  loadContest() {
    const contestId = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading.set(true);
    this.contestsService.getContestById(contestId).subscribe({
      next: (res) => {
        this.contest.set(res.data);
        this.calculateDuration();
        this.updateTimeCalculations();
        this.updateAvailableProblems();
        this.initialProblems.set(res.data.problems || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  loadProblems() {
    this.problemsService.getAllPrivateProblem(this.searchTerm()).subscribe({
      next: (res) => {
        this.problems.set(res.data);
        this.availableProblems.set(res.data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  restoreInitialProblems(): void {
    // Lấy danh sách problem ban đầu và hiện tại
    const initialProblemIds = new Set(this.initialProblems().map(p => p.id));
    const currentProblemIds = new Set(this.contest()!.problems!.map(p => p.id));

    // Các problem đã bị xóa so với trạng thái ban đầu -> thêm lại
    initialProblemIds.forEach(problemId => {
      if (!currentProblemIds.has(problemId)) {
        this.problemsService.toggleContestStatus(problemId!).subscribe({
          next: (res) => {
            console.log(`Restored problem ${problemId} to contest`);
            const problemToRestore = this.problems().find(p => p.id === problemId);
            if (problemToRestore) {
              this.contest.update(current => ({
                ...current,
                problems: [...current!.problems!, problemToRestore]
              }));
            }
            this.updateAvailableProblems();
          },
          error: (err) => {
            console.error(`Error restoring problem ${problemId}:`, err);
          }
        });
      }
    });

    // Các problem đã được thêm so với trạng thái ban đầu -> xóa đi
    currentProblemIds.forEach(problemId => {
      if (!initialProblemIds.has(problemId)) {
        this.problemsService.toggleContestStatus(problemId!).subscribe({
          next: (res) => {
            console.log(`Removed problem ${problemId} from contest`);
            this.contest.update(current => ({
              ...current,
              problems: current!.problems!.filter(p => p.id !== problemId)
            }));
            this.updateAvailableProblems();
          },
          error: (err) => {
            console.error(`Error removing problem ${problemId}:`, err);
          }
        });
      }
    });
  }

  // Update available problems by filtering out already selected ones
  updateAvailableProblems(): void {
    const selectedProblemIds = new Set(this.contest()!.problems!.map(p => p.id));
    const available = this.problems().filter(p => !selectedProblemIds.has(p.id));
    this.availableProblems.set(available);
  }

  // Add a problem to the contest
  addProblem(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const problemId = Number(select.value);
    this.problemsService.toggleContestStatus(problemId).subscribe()

    if (problemId) {
      const problemToAdd = this.problems().find(p => p.id === problemId);
      if (problemToAdd) {
        this.contest.update(current => ({
          ...current,
          problems: [...current!.problems!, problemToAdd]
        }));
        this.updateAvailableProblems();
        select.value = ''; // Reset dropdown
      }
    }
  }

  // Remove a problem from the contest
  removeProblem(problemId: number): void {
    this.problemsService.toggleContestStatus(problemId).subscribe({
      next: (res) => {
        console.log('Toggle status response:', res);
        this.contest.update(current => ({
          ...current,
          problems: current!.problems!.filter(p => p.id !== problemId)
        }));
        this.updateAvailableProblems();
        this.loadProblems();
      },
      error: (err) => {
        console.error('Error toggling status:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileSelected.set(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.fileSelected.set(null);
    this.imagePreview.set(null);
    this.contest.update(current => ({
      ...current,
      image: undefined
    }));
    // Reset input value
    const input = document.getElementById('contestImage') as HTMLInputElement;
    if (input) input.value = '';
  }

  onDescriptionChange(html: string) {
    this.contest.update(current => ({
      ...current,
      description: html
    }));
  }

  toDateTimeLocalString(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  // Calculate duration when start and end times are provided
  calculateDuration(): void {
    const startTime = this.contest()!.startTime;
    const endTime = this.contest()!.endTime;

    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (end > start) {
        const diffMs = end.getTime() - start.getTime();
        const diffMinutes = Math.round(diffMs / 60000); // Convert ms to minutes
        this.duration.set(diffMinutes);
      }
    }
  }

  // Calculate end time when start time and duration are provided
  calculateEndTime(): void {
    const startTime = this.contest()!.startTime;
    const durationMinutes = this.duration();

    if (startTime && durationMinutes && durationMinutes > 0) {
      const start = new Date(startTime);
      const end = new Date(start.getTime() + (durationMinutes * 60000));
      this.contest.update(current => ({
        ...current,
        endTime: this.toDateTimeLocalString(end)
      }));
    }
  }

  // Handle updates when start time changes
  updateTimeCalculations(): void {
    const duration = this.duration();

    if (duration && duration > 0) {
      this.calculateEndTime();
    } else if (this.contest()!.endTime) {
      this.calculateDuration();
    }
  }

  onSearchTermChange() {
    this.loadProblems();
  }

  onSummit() {
    this.isLoading.set(true);
    this.contestsService.updateContest(this.contest()!, this.fileSelected()!).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.toarst.success('Contest created successfully!', 'Success');
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this.toarst.error('Error creating contest', 'Error');
      }
    });
  }

  ngOnDestroy() {
    this.descriptionEditor.destroy();
  }

  onCancel() {
    this.restoreInitialProblems();
    this.router.navigate(['/contests']);
  }

  now() {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format for datetime-local
  }
}
