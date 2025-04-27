import { Component, OnInit, signal } from '@angular/core';
import { SolutionsService } from '../../core/services/solutions.service';
import { Solution } from '../../core/models/solutions.model';
import { PageMeta } from '../../core/models/page-meta.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tag } from '../../core/models/tag.model';
import { TabNavigationComponent } from '../../shared/components/tab-navigation/tab-navigation.component';
import { SolutionItemComponent } from '../../shared/components/solutions/solution-item/solution-item.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SolutionFilterComponent } from '../../shared/components/solutions/solution-filter/solution-filter.component';
import { TitleService } from '../../core/services/shared/title.service';
import { Problem } from '../../core/models/problem.model';
import { ProblemsService } from '../../core/services/problems.service';
import { Submission } from '../../core/models/submission.model';
import { User } from '../../core/models/user.model';
import { SharedService } from '../../core/services/shared/shared.service';
import { SubmissionsService } from '../../core/services/submissions.service';

@Component({
  selector: 'app-problem-solutions',
  imports: [RouterLink, SolutionFilterComponent, TabNavigationComponent, SolutionItemComponent, PaginationComponent],
  templateUrl: './problem-solutions.component.html',
  styleUrl: './problem-solutions.component.css'
})
export class ProblemSolutionsComponent implements OnInit {
  private tags: Tag[] = [];
  private sortBy: "votes" | "views" | "createdAt" = "votes"

  problem = signal<Problem | null>(null);
  submission = signal<Submission | null>(null);
  user: User | null = null
  solutions: Solution[] = []
  pageMeta: PageMeta = { page: 1, take: 10, pageCount: 0, itemCount: 0, hasNextPage: true, hasPreviousPage: true };
  isShowShareSolution: boolean = false

  constructor(
    private solutionsService: SolutionsService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private problemService: ProblemsService,
    private sharedService: SharedService,
    private submissionsService: SubmissionsService
  ) {
    this.loadSubmission();
  }

  ngOnInit(): void {
    const problemId = Number(this.route.snapshot.paramMap.get('problemId')!);

    this.problemService.getProblemById(problemId).subscribe(response => {
      this.problem.set(response.data);

      // Đợi signal cập nhật xong mới gọi API tiếp theo
      queueMicrotask(() => {
        if (this.problem()) {
          this.titleService.setTitle(`${this.problem()!.title} - Solutions`);
          this.fetchSolutions(this.problem()!.id);
        }
      });
    });

    this.sharedService.globalUser$.subscribe(value => {
      this.user = value;

      // // Chờ signal cập nhật, sau đó mới gọi API lấy submission
      // queueMicrotask(() => {
      //   if (this.user && this.problem()) {
      //     this.submissionsService.getLastSumissionsCorrectByUserIdAndProblemId({
      //       userId: this.user.id,
      //       problemId: this.problem()!.id
      //     }).subscribe((response: Submission | undefined) => {
      //       if (response) {
      //         this.submission = response;
      //       }
      //     });
      //   }
      // });

    });
  }

  fetchSolutions(problemId: number): void {
    this.solutionsService.getSolutions(
      this.pageMeta.page,
      this.pageMeta.take,
      problemId,
      this.tags,
      this.sortBy
    ).subscribe((response: { data: Solution[], meta: PageMeta }) => {
      this.solutions = response.data;
      this.pageMeta = response.meta;
    });
  }

  loadSubmission() {
    const problemId = Number(this.route.snapshot.paramMap.get('problemId')!);
    this.submissionsService.getLastSumissionCorrectByProblemId(problemId).subscribe({
      next: (response) => {
        this.submission.set(response.data);
      },
      error: (error) => {
        console.error('Error fetching submission:', error);
      }
    });
  }


  onPageChange(page: number) {
    if (this.problem !== undefined) {
      this.pageMeta.page = page
      this.fetchSolutions(this.problem()!.id);
    }
  }

  onFilterChange(filter: { sortBy: "votes" | "views" | "createdAt"; tags: { id: number; name: string }[] }) {
    this.tags = filter.tags
    this.sortBy = filter.sortBy
    if (this.problem) {
      this.fetchSolutions(this.problem()!.id)
    }
  }
}
