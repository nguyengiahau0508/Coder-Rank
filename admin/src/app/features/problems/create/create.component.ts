import { Component, signal } from '@angular/core';
import { Problem } from '../models/problem.models';
import { Tag } from '../models/tag.models';
import { TagsService } from '../services/tags.service';
import { ProblemsService } from '../services/problems.service';
import { LoadingComponent } from '../../../shareds/components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TextEditorComponent } from '../../../shareds/components/text-editor/text-editor.component';

@Component({
  selector: 'app-create',
  imports: [
    LoadingComponent,
    FormsModule,
    CommonModule,
    TextEditorComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  isLoading = signal(false);

  problem = signal<Problem>({
    title: '',
    description: '',
    note: '',
    difficulty: 'easy',
    timeLimit: 0,
    memoryLimit: 0,
    isPublic: false,
    tags: []
  });

  tags = signal<Tag[]>([]);
  descriptionEditor = new Editor();
  noteEditor = new Editor();

  constructor(
    private readonly tagsService: TagsService,
    private readonly problemsService: ProblemsService,
    private readonly router: Router,
    private readonly tortoastr: ToastrService
  ) {
    this.loadTags();
  }

  loadTags() {
    this.isLoading.set(true);
    this.tagsService.getTags().subscribe({
      next: (res) => {
        this.tags.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  isTagSelected(tagId: number): boolean {
    return this.problem().tags!.some(t => t.id === tagId);
  }

  addTags(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions);

    const newTags = selectedOptions.map(option => {
      const tagId = Number(option.value);
      return this.tags().find(tag => tag.id === tagId)!;
    });

    // Update problem tags
    this.problem.update(current => ({
      ...current,
      tags: [...current!.tags!, ...newTags]
    }));

    // Clear selection
    selectElement.selectedIndex = -1;
  }

  removeTag(tagToRemove: Tag) {
    this.problem.update(current => ({
      ...current,
      tags: current!.tags!.filter(tag => tag.id !== tagToRemove.id)
    }));
  }

  onDescriptionChange(html: string) {
    this.problem.update(current => ({
      ...current,
      description: html
    }));
  }

  onNoteChange(html: string) {
    this.problem.update(current => ({
      ...current,
      note: html
    }));
  }

  onSubmit() {
    this.isLoading.set(true);
    this.problemsService.createProblem(this.problem()).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.tortoastr.success('Problem created successfully!', 'Success');
        this.router.navigate(['/problems/edit', res.data.id]);
      },
      error: (err) => {
        console.error(err);
        this.tortoastr.error('Failed to create problem', 'Error');
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy() {
    this.descriptionEditor.destroy();
    this.noteEditor.destroy();
  }

  onCancel() {
    this.router.navigate(['/problems']);
  }
}
