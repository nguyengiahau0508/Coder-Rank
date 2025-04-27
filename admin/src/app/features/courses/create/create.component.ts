import { Component, signal } from '@angular/core';
import { LoadingComponent } from '../../../shareds/components/loading/loading.component';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { TextEditorComponent } from '../../../shareds/components/text-editor/text-editor.component';

@Component({
  selector: 'app-create',
  imports: [
    LoadingComponent,
    FormsModule,
    TextEditorComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  courses = signal<Partial<Course>>({
    title: '',
    description: '',
  });

  fileSelected = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  isLoading = signal(false);

  constructor(
    private readonly courseService: CoursesService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }

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
    this.courses.update(current => ({
      ...current,
      imageUrl: undefined
    }));
    // Reset input value
    const input = document.getElementById('courseImage') as HTMLInputElement;
    if (input) input.value = '';
  }

  onDescriptionChange(html: string): void {
    this.courses.update((current) => ({
      ...current,
      description: html
    }));
  }

  onSubmit() {
    this.isLoading.set(true);
    this.courseService.createCourse(this.courses(), this.fileSelected()!).subscribe({
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
}
