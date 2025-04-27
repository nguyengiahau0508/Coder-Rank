import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentItemComponent } from '../comment-item/comment-item.component';
import { SolutionCommentService } from '../../../../../core/services/solution-comments.service';
import { Comment } from '../../../../../core/models/comment.model';

@Component({
  selector: 'app-comment-list',
  imports: [CommentItemComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {
  @Input({ required: true }) comments!: Comment[]
  @Output() refreshComment = new EventEmitter<void>()
  constructor(private commentService: SolutionCommentService) {
  }

  onRefreshComment() {
    this.refreshComment.emit()
  }
}
