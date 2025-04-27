import { Component, signal } from '@angular/core';
import { LoadingComponent } from '../../../shareds/components/loading/loading.component';
import { PaginationComponent } from '../../../shareds/components/pagination/pagination.component';
import { Contest } from '../models/contest.model';
import { PageMeta } from '../../../shareds/models/page-meta.model';
import { ContestsService } from '../services/contests.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [
    LoadingComponent,
    PaginationComponent,
    FormsModule,
    DatePipe,
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  isLoading = signal<boolean>(false);
  contests = signal<Contest[]>([]);
  meta = signal<PageMeta>({ page: 1, take: 10 });
  searchTerm = signal<string>('');
  status = signal<string>('');

  constructor(
    private readonly contestsService: ContestsService,
    private readonly router: Router
  ) {
    this.loadContests();
  }

  loadContests() {
    this.isLoading.set(true);
    this.contestsService.getContests(this.meta().page, this.meta().take, this.searchTerm(), this.status()).subscribe({
      next: (res) => {
        this.contests.set(res.data);
        this.meta.set(res.meta);
      },
      error: () => {
        // Handle error
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onPageChange(page: number) {
    this.meta.set({ ...this.meta(), page });
    this.loadContests();
  }

  onSearchChange() {
    this.meta.set({ ...this.meta(), page: 1 });
    this.loadContests();
  }

  onFilterChange() {
    this.meta.set({ ...this.meta(), page: 1 });
    this.loadContests();
  }

  onCreateContest() {
    this.router.navigate(['/contests/create']);
  }

  onEditContest(id: number) {
    this.router.navigate(['/contests/edit', id]);
  }

  onDeleteContest(id: number) {
    // Handle delete contest
  }
}
