import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { Comment } from '../../../../../core/models/comment.model';

@Component({
  selector: 'app-comment-section',
  imports: [
    CommentListComponent,
    CommentBoxComponent
  ],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input({ required: true }) comments!: Comment[]
  @Input({ required: true }) solutionId!: number
  @Output() refreshComment = new EventEmitter<void>()

  constructor() {
  }

  onRefresh() {
    this.refreshComment.emit()
  }
}
