
import { Component, ElementRef, Input, ViewChild, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { SolutionCommentService } from '../../../../../core/services/solution-comments.service';
import { SharedService } from '../../../../../core/services/shared/shared.service';
import { User } from '../../../../../core/models/user.model';
import { CommentsService } from '../../../../../core/services/comments.service';
import { Solution } from '../../../../../core/models/solutions.model';
import { Comment } from '../../../../../core/models/comment.model';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [MarkdownModule, FormsModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css'
})
export class CommentBoxComponent implements AfterViewInit, OnInit {
  @Input() parentId: number | null = null;
  @Input() solutionId: number | null = null;

  @Output() refreshComment = new EventEmitter<void>()
  @Output() refreshReplyComment = new EventEmitter<void>()

  user: User | null = null
  isPreview: boolean = false;
  commentText = '';

  constructor(
    private readonly commentService: CommentsService,
    private solutionCommentsService: SolutionCommentService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.globalUser$.subscribe(value => {
      this.user = value
    })
  }

  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;


  ngAfterViewInit() {
    setTimeout(() => this.autoResize(), 0);
  }

  onPreview() {
    this.isPreview = !this.isPreview;

    // Nếu thoát chế độ preview, cần resize textarea ngay lập tức
    setTimeout(() => this.autoResize(), 0);
  }

  autoResize() {
    if (this.textArea) {
      const el = this.textArea.nativeElement;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }


  onPostComment() {
    if (this.user) {
      const payload: Comment = {
        content: this.commentText,
        solution: { id: this.solutionId } as Solution,
        parentComment: this.parentId ? { id: this.parentId } as Comment : null,
        upvotes: 0,
        downvotes: 0,
        replies: []
      };

      console.log('Payload:', payload);

      this.commentService.createComment(payload).subscribe({
        next: (response) => {
          if (response) {
            console.log('Comment created successfully:', response);
            this.commentText = '';
            this.parentId == null ? this.refreshComment.emit() : this.refreshReplyComment.emit();
          }
        },
        error: (error) => {
          console.error('Error creating comment:', error);
        }
      });
    } else {
      this.sharedService.updateGlobalIsOpenningLoginForm(true);
    }
  }
}

