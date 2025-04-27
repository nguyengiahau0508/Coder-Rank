import { Component, signal } from "@angular/core";
import { ProblemListComponent } from "../../shared/components/problems/problem-list/problem-list.component";
import { ProblemFilterComponent } from "../../shared/components/problems/problem-list-filter/problem-filter.component";
import { ProblemsService } from "../../core/services/problems.service";
import { Problem } from "../../core/models/problem.model";
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { TabNavigationComponent } from "../../shared/components/tab-navigation/tab-navigation.component";
import { Tag } from "../../core/models/tag.model";
import { PageMeta } from "../../core/models/page-meta.model";

@Component({
  selector: "app-problemset",
  templateUrl: "./problemset.component.html",
  styleUrls: ["./problemset.component.css"],
  standalone: true,
  imports: [TabNavigationComponent,
    ProblemListComponent,
    ProblemFilterComponent,
    PaginationComponent,
  ],
})
export class ProblemsetComponent {
  problems = signal<Problem[]>([])
  tagsIdSelected = signal<number[]>([])
  pageMeta = signal<PageMeta>({ page: 1, take: 10, pageCount: 0, itemCount: 0, hasNextPage: true, hasPreviousPage: true });
  difficulty = signal<string | null>(null)

  constructor(
    private readonly problemsService: ProblemsService
  ) {
    this.loadProblem()
  }

  loadProblem() {
    this.problemsService.getAllProblems(this.pageMeta().page, this.pageMeta().take, this.tagsIdSelected(), this.difficulty()).subscribe({
      next: (response) => {
        this.problems.set(response.data)
        this.pageMeta.set(response.meta)
      }
    })
  }

  onFilterChange(filter: { difficulty: string | null; tags: Tag[] }) {
    this.tagsIdSelected.set(filter.tags.map(tag => tag.id))
    this.difficulty.set(filter.difficulty)
    this.loadProblem()
  }

  onPageChange(page: number) {
    this.pageMeta.set({
      ...this.pageMeta(), // Lấy giá trị hiện tại
      page: page
    });
    this.loadProblem();
  }
}

