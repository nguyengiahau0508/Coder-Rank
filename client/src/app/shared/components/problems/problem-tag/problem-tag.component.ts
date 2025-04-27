import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Tag } from "../../../../core/models/tag.model";

@Component({
  selector: 'app-problem-tag',
  standalone: true,
  templateUrl: './problem-tag.component.html',
  styleUrls: ['./problem-tag.component.css']
})
export class ProblemTagsComponent {
  @Input({ required: true }) tags: Tag[] = []; // Nhận array tags từ input
  @Output() tagId = new EventEmitter<number>();

  onTagSelected(tagId: number) {
    this.tagId.emit(tagId);
  }
}
