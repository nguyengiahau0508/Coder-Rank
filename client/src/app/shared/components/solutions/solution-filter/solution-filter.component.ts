import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { TagsService } from '../../../../core/services/tags.service';
import { Tag } from '../../../../core/models/tag.model';

@Component({
  selector: 'app-solution-filter',
  imports: [],
  templateUrl: './solution-filter.component.html',
  styleUrl: './solution-filter.component.css'
})
export class SolutionFilterComponent {
  private tagsService = inject(TagsService);

  // Lọc theo độ khó
  sortByFilter = signal<"votes" | "views" | "createdAt">("createdAt");

  // Lọc theo tag
  allTags = signal<Tag[]>(this.tagsService.getAllTags());
  selectedTags = signal<Tag[]>([]);


  @Input() set tagId(tagId: number | null) {
    if (tagId) this.onTagSelect(tagId)
  }

  // Emit sự kiện skhi filter thay đổi
  @Output() filterChanged = new EventEmitter<{ sortBy: "votes" | "views" | "createdAt"; tags: Tag[] }>();

  // ✅ Định nghĩa phương thức `onDifficultyChange`
  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as "votes" | "views" | "createdAt";
    this.sortByFilter.set(value);
    this.emitFilterChange();
  }

  // Lấy giá trị từ select event
  getEventValue(event: Event): number {
    return Number((event.target as HTMLSelectElement).value);
  }

  onTagSelect(tagId: number) {
    if (!tagId) return;

    const tag = this.allTags().find(t => t.id === tagId);

    if (tag && !this.selectedTags().some(t => t.id === tag.id)) {
      this.selectedTags.update(tags => [...tags, tag]);
      this.emitFilterChange();
    }
  }

  // Xóa tag đã chọn
  removeTag(tag: Tag) {
    this.selectedTags.update(tags => tags.filter(t => t.id !== tag.id));
    this.emitFilterChange();
  }

  // Emit sự kiện filter thay đổi
  private emitFilterChange() {
    this.filterChanged.emit({
      sortBy: this.sortByFilter(),
      tags: this.selectedTags(),
    });
  }

}
