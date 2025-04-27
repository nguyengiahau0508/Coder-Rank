import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Lesson } from './models/lesson.model';
import { LessonsService } from './services/lessons.services';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css',
  animations: [
    trigger('slideInOut', [
      state('expanded', style({
        transform: 'translateX(0)',
        opacity: 1,
        width: '33.3333%'
      })),
      state('collapsed', style({
        transform: 'translateX(100%)',
        opacity: 0,
        width: '0px',
        padding: '0px'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class LessonsComponent {
  lessons = signal<Lesson[]>([]);
  isLoading = signal<boolean>(false);
  isCollapsed = signal<boolean>(false);

  activeLessonId = signal<number>(0);

  constructor(
    private readonly lessonsService: LessonsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }



  ngOnInit() {
    this.route.firstChild?.paramMap.subscribe(params => {
      const lessonId = Number(params.get('lessonId'));
      this.activeLessonId.set(lessonId || 0);
    });

    this.loadLessons();
  }

  loadLessons() {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.lessonsService.getLessons(courseId).subscribe({
      next: (res) => {
        this.lessons.set(res.data);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  onDetailLesson(lessonId: number) {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate([`courses/detail/${courseId}/lessons/detail`, lessonId]);
  }

  toggleLessons() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}
