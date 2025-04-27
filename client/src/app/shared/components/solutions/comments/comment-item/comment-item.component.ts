
import { Component, EventEmitter, forwardRef, Input, OnInit, Output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SolutionComment } from '../../../../../core/models/solution-comment.model';
import { UsersService } from '../../../../../core/services/users.service';
import { SolutionCommentService } from '../../../../../core/services/solution-comments.service';
import { Observable } from 'rxjs';
import { MarkdownModule } from 'ngx-markdown';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { User } from '../../../../../core/models/user.model';
import { SharedService } from '../../../../../core/services/shared/shared.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Comment } from '../../../../../core/models/comment.model';
import { CommentsService } from '../../../../../core/services/comments.service';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [
    DatePipe,
    forwardRef(() => CommentItemComponent),
    MarkdownModule,
    forwardRef(() => CommentBoxComponent),
    FontAwesomeModule
  ],

  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.css'
})
export class CommentItemComponent implements OnInit {
  @Input({ required: true }) comment!: Comment;
  @Output() refreshComment = new EventEmitter<void>()

  children = signal<Comment[]>([])

  parentComment: SolutionComment | undefined = undefined
  commentsChildren: SolutionComment[] = []; // Luôn khởi tạo với mảng rỗng
  showReplies: boolean = false;
  showReplyBox: boolean = false;
  user: User | null = null
  constructor(
    private usersService: UsersService,
    private solutionCommentsService: SolutionCommentService,
    private sharedService: SharedService,
    private readonly commentsService: CommentsService
  ) {
  }

  ngOnInit() {
    this.sharedService.globalUser$.subscribe(value => {
      this.user = value
    })

    this.solutionCommentsService.getRepliesByCommentId(this.comment!.id!).subscribe((response => {
      this.commentsChildren = response
    }))
  }

  loadChildren() {
    this.commentsService.getCommentsByRootId(1, 10, this.comment.id!).subscribe((response) => {
      this.children.set(response.data)
    })
  }

  onRefreshComment() {
    this.loadChildren()
    this.toggleReplyBox()
    this.toggleReplies()
  }

  onDeleteComment() {
    this.solutionCommentsService.deleteComment(this.comment!.id!).subscribe()
    this.refreshComment.emit()
  }

  getName(userId: number): Observable<string | undefined> {
    return this.usersService.getNameById(userId);
  }

  getAvatar(userId: number): Observable<string | undefined> {
    return this.usersService.getAvartaById(userId);
  }

  toggleReplies() {
    this.showReplies = !this.showReplies;
    if (this.showReplies) {
      this.loadChildren()
    } else this.children.set([])
  }

  toggleReplyBox() {
    this.showReplyBox = !this.showReplyBox; // 🔹 Bật/tắt ô nhập comment

  }

  trackByFn(index: number, item: any) {
    return item.id; // Improve performance when rendering lists
  }
}

