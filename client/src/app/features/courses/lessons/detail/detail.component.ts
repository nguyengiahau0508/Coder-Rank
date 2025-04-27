import { Component, signal } from '@angular/core';
import { SpinnerLoadingComponent } from '../../../../shared/components/spinner-loading/spinner-loading.component';
import { Lesson, Question } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.services';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HtmlViewerComponent } from '../../../../shared/components/html-viewer/html-viewer.component';
@Component({
  selector: 'app-detail',
  imports: [
    SpinnerLoadingComponent,
    CommonModule,
    HtmlViewerComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  lesson = signal<Lesson | null>(null);
  isLoading = signal<boolean>(true);
  selectedAnswers = signal<{ [questionId: number]: number[] }>({});
  questionResults = signal<{ [questionId: number]: boolean | null }>({});
  showResults = signal<boolean>(false);

  constructor(
    private readonly lessonService: LessonsService,
    private readonly route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      const lessonId = Number(params.get('lessonId'));
      this.loadLesson();
    });
  }

  loadLesson() {
    this.isLoading.set(true);
    const lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));
    this.lessonService.getLessonById(lessonId).subscribe({
      next: (res) => {
        this.lesson.set(res.data);
      },
      error: () => {
        this.lesson.set(null);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  onAnswerSelect(question: Question, answerId: number) {
    const currentAnswers = this.selectedAnswers();

    if (question.type === 'single') {
      this.selectedAnswers.set({
        ...currentAnswers,
        [question.id]: [answerId]
      });
    } else {
      const questionAnswers = currentAnswers[question.id] || [];
      if (questionAnswers.includes(answerId)) {
        this.selectedAnswers.set({
          ...currentAnswers,
          [question.id]: questionAnswers.filter(id => id !== answerId)
        });
      } else {
        this.selectedAnswers.set({
          ...currentAnswers,
          [question.id]: [...questionAnswers, answerId]
        });
      }
    }
  }

  checkAnswers() {
    const lesson = this.lesson();
    if (!lesson?.questions) return;

    const results: { [questionId: number]: boolean } = {};

    lesson.questions.forEach(question => {
      const selected = this.selectedAnswers()[question.id] || [];
      const correctAnswerIds = question.answers
        .filter(answer => answer.isCorrect)
        .map(answer => answer.id);

      if (question.type === 'single') {
        results[question.id] = selected.length === 1 && correctAnswerIds.includes(selected[0]);
      } else {
        results[question.id] =
          selected.length === correctAnswerIds.length &&
          selected.every(id => correctAnswerIds.includes(id));
      }
    });

    this.questionResults.set(results);
    this.showResults.set(true);
  }

  resetQuiz() {
    this.selectedAnswers.set({});
    this.questionResults.set({});
    this.showResults.set(false);
  }
}
