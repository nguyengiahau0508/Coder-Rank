import { Component, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { Lesson } from '../lessons/models/lesson.model';
import { CoursesService } from '../services/courses.services';
import { LessonsService } from '../lessons/services/lessons.services';
import { ActivatedRoute, Router } from '@angular/router';
import { HtmlViewerComponent } from '../../../shared/components/html-viewer/html-viewer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [
    HtmlViewerComponent,
    CommonModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  course = signal<Course | null>(null)
  lessons = signal<Lesson[]>([])

  isLoading = signal<boolean>(false)

  constructor(
    private readonly courseService: CoursesService,
    private readonly lessonsService: LessonsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loadCourse()
    this.loadLessons()
  }

  loadCourse() {
    this.isLoading.set(true)
    const courseId = this.route.snapshot.paramMap.get('id')
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (res) => {
          this.course.set(res.data)
        },
        error: () => {
          this.router.navigate(['/'])
        }
      })
    }
  }

  loadLessons() {
    const courseId = Number(this.route.snapshot.paramMap.get('id'))
    this.lessonsService.getLessons(courseId).subscribe({
      next: (res) => {
        this.lessons.set(res.data)
      },
      error: () => {
        this.router.navigate(['/'])
      }
    })
  }

  onDetailLesson(courseId: number, lessonId: number) {
    this.router.navigate([`courses/detail/${courseId}/lessons/detail`, lessonId])
  }
}
