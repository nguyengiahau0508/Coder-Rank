import { Component, signal } from '@angular/core';
import { Problem } from '../models/problem.models';
import { Tag } from '../models/tag.models';
import { Editor } from 'ngx-editor';
import { TagsService } from '../services/tags.service';
import { ProblemsService } from '../services/problems.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '../../../shareds/components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TextEditorComponent } from '../../../shareds/components/text-editor/text-editor.component';

@Component({
  selector: 'app-edit',
  imports: [
    LoadingComponent,
    FormsModule,
    CommonModule,
    TextEditorComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  isLoading = signal(true);

  problem = signal<Problem | null>(null);

  tags = signal<Tag[]>([]);
  descriptionEditor = new Editor();
  noteEditor = new Editor();

  constructor(
    private readonly tagsService: TagsService,
    private readonly problemsService: ProblemsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly tortoastr: ToastrService
  ) {
    this.loadProblem(Number(this.route.snapshot.params['id']));
    this.loadTags();
  }

  loadProblem(id: number) {
    this.isLoading.set(true);
    this.problemsService.getProblem(id).subscribe({
      next: (res) => {
        this.problem.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
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
    return this.problem()!.tags!.some(t => t.id === tagId);
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
    this.problemsService.updateProblem(this.problem()!.id!, this.problem()!).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.tortoastr.success('Problem updated successfully');
      },
      error: (err) => {
        console.error(err);
        this.tortoastr.error('Error updating problem');
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

  onAddTestCase() {
    this.router.navigate([`/problems/${this.problem()!.id}/testcases`]);
  }
}
