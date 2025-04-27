import { Component, signal } from '@angular/core';
import { Leaderboard } from '../../../core/models/leader-board.model';
import { PageMeta } from '../../../core/models/page-meta.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { LeaderboardService } from '../../../core/services/leaderboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Problem } from '../../../core/models/problem.model';
import { ProblemsService } from '../../../core/services/problems.service';
import { Contest } from '../../../core/models/contest.model';
import { ContestService } from '../../../core/services/contests.service';
import { SubmissionsService } from '../../../core/services/submissions.service';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contest-ranking',
  imports: [
    LoadingComponent,
    PaginationComponent,
    CommonModule
  ],
  templateUrl: './contest-ranking.component.html',
  styleUrl: './contest-ranking.component.css'
})
export class ContestRankingComponent {
  isLoading = signal(false);

  contest = signal<Contest | null>(null)

  leaderboard = signal<Leaderboard[]>([])
  meta = signal<PageMeta>({ page: 1, take: 1000, itemCount: 0, pageCount: 0, hasPreviousPage: false, hasNextPage: false });


  problems = signal<Problem[]>([])
  problemStatuses = signal<Record<string, { status: string; total: number }>>({});

  constructor(
    private readonly problemService: ProblemsService,
    private readonly leaderboardService: LeaderboardService,
    private readonly contestService: ContestService,
    private readonly submissionsService: SubmissionsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loadLeaderboard();
    this.loadProblems();
    this.loadContest();
  }

  getStatusObj(userId: number, problemId: number) {
    const key = `${userId}_${problemId}`;
    return this.problemStatuses()[key];
  }

  loadContest() {
    this.isLoading.set(true);
    const contestId = Number(this.route.snapshot.paramMap.get('contestId'));
    this.contestService.getContestById(contestId).subscribe({
      next: (res) => {
        this.contest.set(res.data);
        this.isLoading.set(false);

        // Load status nếu đã có leaderboard + problems
        if (this.leaderboard().length && this.problems().length) {
          this.loadSubmissionStatuses(contestId, this.leaderboard().map(l => l.user), this.problems());
        }
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }


  loadProblems() {
    this.isLoading.set(true);
    const contestId = Number(this.route.snapshot.paramMap.get('contestId'));
    this.problemService.getProblemByContestId(contestId).subscribe({
      next: (res) => {
        this.problems.set(res.data);
        this.isLoading.set(false);

        // Load status nếu đã có data khác
        if (this.contest() && this.leaderboard().length) {
          this.loadSubmissionStatuses(contestId, this.leaderboard().map(l => l.user), res.data);
        }
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  loadLeaderboard() {
    this.isLoading.set(true);
    const contestId = Number(this.route.snapshot.paramMap.get('contestId'));
    this.leaderboardService.getLeaderBoard(contestId, this.meta().page, this.meta().take).subscribe({
      next: (res) => {
        this.leaderboard.set(res.data);
        this.meta.set(res.meta);
        this.isLoading.set(false);

        // Load status nếu đã có data khác
        if (this.contest() && this.problems().length) {
          this.loadSubmissionStatuses(contestId, res.data.map(l => l.user), this.problems());
        }
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }


  loadSubmissionStatuses(contestId: number, users: User[], problems: Problem[]) {
    users.forEach(user => {
      problems.forEach(problem => {
        this.submissionsService.getStatus(contestId, user.id, problem.id).subscribe({
          next: (res) => {
            const key = `${user.id}_${problem.id}`;
            const current = this.problemStatuses();
            this.problemStatuses.set({ ...current, [key]: res.data });
            console.log(res.data);
          },
          error: () => {
            // fallback nếu cần
          }
        });
      });
    });
  }

  onPageChange(page: number) {
    this.meta.set({ ...this.meta(), page });
    this.loadLeaderboard();
  }
}
