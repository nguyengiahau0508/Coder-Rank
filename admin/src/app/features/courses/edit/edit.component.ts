import { Component, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../../../shareds/components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { TextEditorComponent } from '../../../shareds/components/text-editor/text-editor.component';

@Component({
  selector: 'app-edit',
  imports: [
    LoadingComponent,
    FormsModule,
    TextEditorComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  courses = signal<Course | null>(null);

  fileSelected = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  isLoading = signal(false);

  constructor(
    private readonly courseService: CoursesService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute
  ) {
    this.loadCourse();
  }

  loadCourse() {
    this.isLoading.set(true);
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (res) => {
          this.courses.set(res.data);
          if (res.data.imageUrl) this.imagePreview.set(res.data.imageUrl);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Failed to load course', 'Error');
          this.isLoading.set(false);
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileSelected.set(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.fileSelected.set(null);
    this.imagePreview.set(null);
    this.courses!.update(current => ({
      ...current!,
      imageUrl: undefined
    }));
    // Reset input value
    const input = document.getElementById('courseImage') as HTMLInputElement;
    if (input) input.value = '';
  }

  onDescriptionChange(html: string): void {
    this.courses!.update((current) => ({
      ...current!,
      description: html
    }));
  }

  onSubmit() {
    this.isLoading.set(true);
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.updateCourse(courseId, this.courses()!, this.fileSelected()!).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.toastr.success('Course created successfully', 'Success');
        this.router.navigate(['/courses/edit', res.data.id]);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toastr.error('Failed to create course', 'Error');
        console.error(err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }

  onAddLesson() {
    this.router.navigate(['/courses', this.courses()!.id, 'lessons']);
  }
}
