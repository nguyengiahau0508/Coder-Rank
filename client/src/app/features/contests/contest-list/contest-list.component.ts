import { Component, signal } from '@angular/core';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ContestService } from '../../../core/services/contests.service';
import { Contest } from '../../../core/models/contest.model';
import { PageMeta } from '../../../core/models/page-meta.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contest-list',
  standalone: true,
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.css'],
  imports: [
    PaginationComponent,
    DatePipe
  ]
})
export class ContestListComponent {
  contests = signal<Contest[]>([]);
  pageMeta = signal<PageMeta>({ page: 1, take: 10, pageCount: 0, itemCount: 0, hasNextPage: true, hasPreviousPage: true })

  constructor(
    private readonly contestsService: ContestService,
    private readonly router: Router
  ) {
    this.fetchContests()
  }

  fetchContests() {
    this.contestsService.getAllContests(this.pageMeta().page, this.pageMeta().take).subscribe({
      next: (response) => {
        this.contests.set(response.data)
        this.pageMeta.set(response.meta)
      }
    })
  }

  onPageChange(page: number) {
    this.pageMeta.set({
      ...this.pageMeta(),
      page: page
    });
    this.fetchContests();
  }

  onGoToContest(id: number) {
    this.router.navigate(['/contests', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
