import { Component, signal } from '@angular/core';
import { LoadingComponent } from '../../../shareds/components/loading/loading.component';
import { PaginationComponent } from '../../../shareds/components/pagination/pagination.component';
import { Course } from '../models/course.model';
import { PageMeta } from '../../../shareds/models/page-meta.model';
import { CoursesService } from '../services/courses.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [
    LoadingComponent,
    PaginationComponent,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  courses = signal<Course[]>([]);
  meta = signal<PageMeta>({
    page: 1,
    take: 10.
  })

  isLoading = signal<boolean>(false);
  searchTerm = signal<string>('');

  constructor(
    private readonly coursesService: CoursesService,
    readonly toast: ToastrService,
    private readonly router: Router
  ) {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading.set(true);
    this.coursesService.getAllCourses(this.meta().page, this.meta().take, this.searchTerm()).subscribe({
      next: (response) => {
        this.courses.set(response.data);
        this.meta.set(response.meta);
      },
      error: (error) => {
        this.toast.error(error.error.message);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onFilterChange() {
    this.meta.set({ ...this.meta(), page: 1 });
    this.loadCourses();
  }

  onPageChange(page: number) {
    this.meta.set({ ...this.meta(), page });
    this.loadCourses();
  }

  onSearch() {
    this.meta.set({ ...this.meta(), page: 1 });
    this.loadCourses();
  }

  onAdd() {
    this.router.navigate(['/courses/create']);
  }

  onEdit(id: number) {
    this.router.navigate(['/courses/edit', id]);
  }

  onDelete(id: number) {

  }
}
