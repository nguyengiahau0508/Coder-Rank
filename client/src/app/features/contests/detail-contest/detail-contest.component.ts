import { Component, signal } from '@angular/core';
import { Contest } from '../../../core/models/contest.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ContestService } from '../../../core/services/contests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HtmlViewerComponent } from '../../../shared/components/html-viewer/html-viewer.component';

@Component({
  selector: 'app-detail-contest',
  imports: [
    LoadingComponent,
    CommonModule,
    HtmlViewerComponent
  ],
  templateUrl: './detail-contest.component.html',
  styleUrl: './detail-contest.component.css'
})
export class DetailContestComponent {
  public contest = signal<Contest | null>(null)
  public isRegistered = signal<boolean>(false)
  public isLoading = signal<boolean>(true)

  constructor(
    private readonly contestsService: ContestService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loadContest()
    this.loadIsRegistered()
  }

  loadContest() {
    this.isLoading.set(true)
    const id = Number(this.route.snapshot.paramMap.get('contestId'))
    this.contestsService.getContestById(id).subscribe({
      next: (res) => {
        this.contest.set(res.data)
        this.isLoading.set(false)
      },
      error: () => {
        console.error('Contest not found')
      }
    })
  }

  loadIsRegistered() {
    const contestId = Number(this.route.snapshot.paramMap.get('contestId'))
    this.contestsService.isContestRegistered(contestId).subscribe({
      next: (res) => {
        this.isRegistered.set(res.data)
      },
      error: (err) => {
        alert(err.error.message)
      }
    })
  }

  get formattedStartTime() {
    return new Date(this.contest()!.startTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  }

  get formattedEndTime() {
    return new Date(this.contest()!.endTime).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  }

  onGotoProblemDetail(problemId: number) {
    this.router.navigate(['/problems', problemId])
  }

  onRegister() {
    const contestId = this.contest()!.id
    this.isLoading.set(true)
    this.contestsService.registerContest(contestId).subscribe({
      next: () => {
        this.isLoading.set(false)
        this.loadIsRegistered()
      },
      error: (err) => {
        alert(err.error.message)
      }
    })
  }

  onViewRanking() {
    const contestId = this.contest()!.id
    this.router.navigate(['/contests', contestId, 'ranking'])
  }
}
