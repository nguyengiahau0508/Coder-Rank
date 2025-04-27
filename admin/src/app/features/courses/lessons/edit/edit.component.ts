import { Component, signal } from '@angular/core';
import { LoadingComponent } from '../../../../shareds/components/loading/loading.component';
import { TextEditorComponent } from '../../../../shareds/components/text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { Lesson } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-edit',
  imports: [
    LoadingComponent,
    TextEditorComponent,
    FormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  questionTypeEnum = {
    MULTIPLE: 'multiple',
    SINGLE: 'single'
  };

  lesson = signal<Lesson | null>(null)
  isLoading = signal(false);

  collapsedQuestions = new Set<number>();

  constructor(
    private readonly lessonService: LessonsService,
    private readonly toast: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loadLesson();
  }

  loadLesson() {
    const lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));
    this.lessonService.getLessonById(lessonId).subscribe({
      next: (res) => {
        this.lesson.set(res.data);
        this.isLoading.set(false);

        // Set the initial collapsed state for questions
        this.lesson()!.questions?.forEach((_, index) => {
          this.collapsedQuestions.add(index);
        });
      },
      error: (error) => {
        this.toast.error(error.message, 'Error');
        this.isLoading.set(false);
      }
    });
  }

  onContentChange(html: string) {
    this.lesson!.update(current => ({
      ...current!,
      content: html
    }));
  }

  toggleCollapse(index: number) {
    if (this.collapsedQuestions.has(index)) {
      this.collapsedQuestions.delete(index);
    } else {
      this.collapsedQuestions.add(index);
    }
  }

  addQuestion(type: 'multiple' | 'single' = 'multiple') {
    this.lesson.update(current => ({
      ...current!,
      questions: [
        ...(current!.questions || []),
        {
          id: 0,
          text: '',
          order: (current!.questions?.length || 0) + 1,
          type: type,
          answers: [
            { text: '', isCorrect: type === 'single' ? true : false }, // Đáp án đầu tiên đúng cho single
            { text: '', isCorrect: false }
          ]
        }
      ]
    }));
  }
  removeQuestion(index: number) {
    this.lesson.update(current => ({
      ...current!,
      questions: (current!.questions || []).filter((_, i) => i !== index)
        .map((q, i) => ({ ...q, order: i + 1 }))
    }));
  }

  addAnswer(questionIndex: number) {
    this.lesson.update(current => ({
      ...current!,
      questions: (current!.questions || []).map((q, i) =>
        i === questionIndex
          ? { ...q, answers: [...(q.answers || []), { text: '', isCorrect: false }] }
          : q
      )
    }));
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    this.lesson.update(current => ({
      ...current!,
      questions: (current!.questions || []).map((q, i) =>
        i === questionIndex
          ? { ...q, answers: q.answers.filter((_, j) => j !== answerIndex) }
          : q
      )
    }));
  }

  updateAnswerCorrectness(questionIndex: number, answerIndex: number) {
    this.lesson.update(current => ({
      ...current!,
      questions: (current!.questions || []).map((q, i) =>
        i === questionIndex
          ? {
            ...q,
            answers: q.answers.map((a, j) => {
              if (q.type === this.questionTypeEnum.SINGLE) {
                return {
                  ...a,
                  isCorrect: j === answerIndex
                };
              }
              return {
                ...a,
                isCorrect: j === answerIndex ? !a.isCorrect : a.isCorrect
              };
            })
          }
          : q
      )
    }));
  }

  onSubmit() {
    this.isLoading.set(true);
    const courseId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.lesson.update(current => ({
      ...current!,
      course: { id: courseId } as Course,
    }));
    this.lessonService.updateLesson(this.lesson()!.id, this.lesson()!).subscribe({
      next: (res) => {
        this.toast.success('Lesson created successfully', 'Success');
        this.isLoading.set(false);
        this.router.navigate([`/courses/${courseId}/lessons/edit`, res.data.id]);
      },
      error: (error) => {
        this.toast.error(error.message, 'Error');
        this.isLoading.set(false);
      }
    });
  }

  onCancel() {
    const courseId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.router.navigate([`/courses/${courseId}/lessons`]);
  }
}
