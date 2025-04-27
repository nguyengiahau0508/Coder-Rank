import { Component, signal } from '@angular/core';
import { Problem } from '../models/problem.models';
import { PageMeta } from '../../../shareds/models/page-meta.model';
import { ProblemsService } from '../services/problems.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shareds/components/loading/loading.component';
import { PaginationComponent } from '../../../shareds/components/pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [
    LoadingComponent,
    FormsModule,
    CommonModule,
    PaginationComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  problems = signal<Problem[]>([]);
  meta = signal<PageMeta>({
    page: 1,
    take: 10,
  })
  isPublic = signal<string>('');
  searchTerm = signal<string>('');

  isLoading = signal<boolean>(false);

  constructor(
    private readonly problemsService: ProblemsService,
    private readonly router: Router
  ) {
    this.loadProblems();
  }

  loadProblems() {
    this.isLoading.set(true);
    this.problemsService.getProblems(this.meta().page, this.meta().take, this.isPublic(), this.searchTerm()).subscribe({
      next: (response) => {
        this.problems.set(response.data);
        this.meta.set(response.meta);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading problems:', error);
        this.isLoading.set(false);
      }
    });
  }

  onFilterChange() {
    this.meta.set({
      ...this.meta(),
      page: 1
    });
    this.loadProblems();
  }

  onChangePage(page: number) {
    this.meta.set({
      ...this.meta(),
      page
    });
    this.loadProblems();
  }

  onChangeIsPublic() {
    this.meta.set({
      ...this.meta(),
      page: 1
    });
    this.loadProblems();
  }

  onSearchChange() {
    this.meta.set({
      ...this.meta(),
      page: 1
    });
    this.loadProblems();
  }

  createProblem() {
    this.router.navigate(['/problems/create']);
  }

  editProblem(id: number) {
    this.router.navigate(['/problems/edit', id]);
  }

  deleteProblem(id: number) {
    // Implement delete logic here
  }
}
