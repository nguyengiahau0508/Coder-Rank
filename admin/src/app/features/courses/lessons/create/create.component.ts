import { Component, signal } from '@angular/core';
import { LoadingComponent } from '../../../../shareds/components/loading/loading.component';
import { Lesson } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.services';
import { ToastrService } from 'ngx-toastr';
import { TextEditorComponent } from '../../../../shareds/components/text-editor/text-editor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  imports: [
    LoadingComponent,
    TextEditorComponent,
    FormsModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  questionTypeEnum = {
    MULTIPLE: 'multiple',
    SINGLE: 'single'
  };

  lastLesson = signal<Lesson | null>(null);

  lesson = signal<Partial<Lesson>>({
    title: '',
    content: '',
    order: 0,
    questions: []
  });
  isLoading = signal(false);

  collapsedQuestions = new Set<number>();

  constructor(
    private readonly lessonService: LessonsService,
    private readonly toast: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loadLastLesson();
  }

  loadLastLesson() {
    const courseId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.lessonService.getLastLessonByCourseId(courseId).subscribe({
      next: (res) => {
        console.log(res);
        this.lastLesson.set(res.data);
        this.lesson.update(current => ({
          ...current,
          order: res.data.order + 1
        }));
      },
      error: (error) => {
        this.toast.error(error.message, 'Error');
      }
    });
  }

  onContentChange(html: string) {
    this.lesson.update(current => ({
      ...current,
      content: html
    }));
  }

  addQuestion(type: 'multiple' | 'single' = 'multiple') {
    this.lesson.update(current => ({
      ...current,
      questions: [
        ...(current.questions || []),
        {
          id: 0,
          text: '',
          order: (current.questions?.length || 0) + 1,
          type: type,
          answers: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
          ]
        }
      ]
    }));
  }

  toggleCollapse(index: number) {
    if (this.collapsedQuestions.has(index)) {
      this.collapsedQuestions.delete(index);
    } else {
      this.collapsedQuestions.add(index);
    }
  }

  removeQuestion(index: number) {
    this.lesson.update(current => ({
      ...current,
      questions: (current.questions || []).filter((_, i) => i !== index)
        .map((q, i) => ({ ...q, order: i + 1 }))
    }));
  }

  addAnswer(questionIndex: number) {
    this.lesson.update(current => ({
      ...current,
      questions: (current.questions || []).map((q, i) =>
        i === questionIndex
          ? { ...q, answers: [...(q.answers || []), { text: '', isCorrect: false }] }
          : q
      )
    }));
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    this.lesson.update(current => ({
      ...current,
      questions: (current.questions || []).map((q, i) =>
        i === questionIndex
          ? { ...q, answers: q.answers.filter((_, j) => j !== answerIndex) }
          : q
      )
    }));
  }

  updateAnswerCorrectness(questionIndex: number, answerIndex: number) {
    this.lesson.update(current => ({
      ...current,
      questions: (current.questions || []).map((q, i) =>
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
      ...current,
      course: { id: courseId } as Course,
    }));
    this.lessonService.createLesson(this.lesson()).subscribe({
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
