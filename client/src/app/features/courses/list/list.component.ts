import { Component, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { PageMeta } from '../../../core/models/page-meta.model';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { CoursesService } from '../services/courses.services';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SpinnerLoadingComponent } from '../../../shared/components/spinner-loading/spinner-loading.component';

@Component({
  selector: 'app-list',
  imports: [
    PaginationComponent,
    SpinnerLoadingComponent,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  courses = signal<Course[]>([])
  meta = signal<PageMeta>({
    page: 1,
    take: 10
  })

  searchTerm = signal('')

  isLoading = signal(false)

  constructor(
    private readonly courseService: CoursesService,
    private readonly router: Router,
  ) {
    this.loadCourses()
  }

  loadCourses() {
    this.isLoading.set(true)
    this.courseService.getAllCourses(this.meta().page, this.meta().take, this.searchTerm()).subscribe({
      next: (response) => {
        this.courses.set(response.data)
        this.meta.set(response.meta)
      },
      error: () => {
        alert('Error loading courses')
      },
      complete: () => {
        this.isLoading.set(false)
      }
    }
    )
  }

  onPageChange(page: number) {
    this.meta.set({
      ...this.meta(),
      page
    })
    this.loadCourses()
  }

  onFilterChange() {
    this.meta.set({
      ...this.meta(),
      page: 1
    })
    this.loadCourses()
  }

  onDetail(courseId: number) {
    this.router.navigate(['courses/detail', courseId])
  }

  
}
