import { Component, signal } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { PageMeta } from '../../../../shareds/models/page-meta.model';
import { LoadingComponent } from '../../../../shareds/components/loading/loading.component';
import { PaginationComponent } from '../../../../shareds/components/pagination/pagination.component';
import { LessonsService } from '../services/lessons.services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-list',
  imports: [
    LoadingComponent,
    PaginationComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  course = signal<Course | null>(null)

  lessons = signal<Lesson[]>([])
  meta = signal<PageMeta>({
    page: 1,
    take: 10,
  })

  isLoading = signal<boolean>(false)
  searchTerm = signal<string>('')

  constructor(
    private readonly lessonService: LessonsService,
    private readonly courseService: CoursesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loadCourse()
    this.loadLessons()
  }

  loadCourse() {
    const courseId = this.route.snapshot.paramMap.get('id')
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (res) => {
          this.course.set(res.data)
        },
        error: () => {
          this.course.set(null)
        }
      })
    }
  }

  loadLessons() {
    this.isLoading.set(true)
    const courseId = Number(this.route.snapshot.paramMap.get('id'))
    this.lessonService.getLessons(this.meta().page, this.meta().take, this.searchTerm(), courseId).subscribe({
      next: (res) => {
        console.log(res)
        this.lessons.set(res.data)
        this.meta.set(res.meta)
        this.isLoading.set(false)
      },
      error: () => {
        this.isLoading.set(false)
      }
    })
  }

  onFilterChange() {
    this.meta.set({ ...this.meta(), page: 1 })
    this.loadLessons()
  }

  onPageChange(page: number) {
    this.meta.set({ ...this.meta(), page })
    this.loadLessons()
  }

  onAddLesson() {
    const courseId = this.route.snapshot.paramMap.get('id')
    this.router.navigate([`/courses/${courseId}/lessons/create`])
  }

  onDeleteLesson(lessonId: number) {
    this.isLoading.set(true)
  }

  onEditLesson(id: number) {
    const courseId = this.route.snapshot.paramMap.get('id')
    this.router.navigate([`/courses/${courseId}/lessons/edit`, id])
  }
}
