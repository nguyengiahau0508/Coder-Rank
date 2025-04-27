
import { Component, signal, effect, OnDestroy } from '@angular/core';
import { ContestService } from '../../../core/services/contests.service';
import { Contest } from '../../../core/models/contest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-contests',
  templateUrl: './next-contests.component.html',
  styleUrl: './next-contests.component.css'
})
export class NextContestsComponent implements OnDestroy {
  contests = signal<Contest[]>([]);

  private intervalId: any;

  constructor(
    private readonly contestsService: ContestService,
    private readonly router: Router
  ) {
    this.loadContests();
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  loadContests() {
    this.contestsService.getUpcomingContests(1, 2).subscribe({
      next: (response) => {
        this.contests.set(response.data);
        console.log(response.data);
      },
      error: err => console.error(err)
    });
  }

  updateTime(): void {
    this.contests.update(contests =>
      contests.map(contest => ({
        ...contest,
        timeUntilStart: this.calculateTimeUntil(contest.startTime)
      }))
    );
  }


  calculateTimeUntil(dateStr: string): string {
    const now = new Date();
    const target = new Date(dateStr);
    const diffMs = target.getTime() - now.getTime();

    if (diffMs <= 0) return 'Started';

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    const parts = [];
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return `Starts in ${parts.join(' ')}`;
  }


  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onGotoContest(contest: Contest): void {
    this.router.navigate(['/contests', contest.id]);
  }
}

