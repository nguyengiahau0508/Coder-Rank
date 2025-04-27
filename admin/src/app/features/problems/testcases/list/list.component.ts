import { Component, signal } from '@angular/core';
import { Problem } from '../../models/problem.models';
import { Testcase } from '../models/testcase.model';
import { PageMeta } from '../../../../shareds/models/page-meta.model';
import { TestCaseService } from '../services/testcase.service';
import { ProblemsService } from '../../services/problems.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../../shareds/components/loading/loading.component';
import { PaginationComponent } from '../../../../shareds/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  imports: [
    LoadingComponent,
    PaginationComponent,
    CommonModule,
    FormsModule,
    CreateComponent,
    EditComponent,
    RouterLink
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  isCreateTestCase = signal<boolean>(false);

  isEditTestCase = signal<boolean>(false);
  selectedTestCase = signal<Testcase | null>(null);

  problem = signal<Problem | null>(null);

  tescases = signal<Testcase[]>([]);
  meta = signal<PageMeta>({
    page: 1,
    take: 10,
  });

  isSampleFilter = signal<string>('');

  isLoading = signal<boolean>(false);
  constructor(
    private readonly testcaseService: TestCaseService,
    private readonly problemService: ProblemsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loadProblem();
    this.loadTestCases();
  }

  loadProblem() {
    this.isLoading.set(true);
    this.problemService.getProblem(this.route.snapshot.params['problemId']).subscribe({
      next: (response) => {
        this.problem.set(response.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  loadTestCases() {
    this.isLoading.set(true);
    this.testcaseService.getTestCases(this.meta().page, this.meta().take, this.route.snapshot.params['problemId'], this.isSampleFilter()).subscribe({
      next: (response) => {
        this.tescases.set(response.data);
        this.meta.set(response.meta);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  onPageChange(page: number) {
    this.meta.set({ ...this.meta(), page });
    this.loadTestCases();
  }

  onFilterChange() {
    this.meta.set({ ...this.meta(), page: 1 });
    this.loadTestCases();
  }

  onChangePage(page: number) {
    this.meta.set({
      ...this.meta(),
      page
    });
    this.loadTestCases();
  }

  onEditTestCase(testcase: Testcase) {
    this.selectedTestCase.set(testcase);
    this.isEditTestCase.set(true);
  }

  onDeleteTestCase(id: number) {
    if (confirm('Are you sure you want to delete this test case?')) {
      this.isLoading.set(true);
      this.testcaseService.deleteTestCase(id).subscribe({
        next: () => {
          this.loadTestCases();
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    }
  }

  onAddTestCase() {
    this.isCreateTestCase.set(true);
  }

  onCancelCreateForm() {
    this.isCreateTestCase.set(false);
    this.loadTestCases();
  }

  onCancelEditForm() {
    this.isEditTestCase.set(false);
    this.loadTestCases();
  }

}
