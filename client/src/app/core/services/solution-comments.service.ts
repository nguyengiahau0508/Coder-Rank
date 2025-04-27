
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SolutionComment } from '../models/solution-comment.model';
import { sampleSolutionComments } from '../../mock/solution-comments.sample';

@Injectable({
  providedIn: 'root'
})
export class SolutionCommentService {
  private comments: SolutionComment[] = [];

  constructor() {
    this.comments = sampleSolutionComments
  }

  // Lấy tất cả comment
  getComments(): Observable<SolutionComment[]> {
    return of(this.comments);
  }

  // Lấy comment theo solutionId
  getCommentsBySolution(solutionId: number): Observable<SolutionComment[]> {
    const filteredComments = this.comments.filter(comment => comment.solutionId === solutionId);
    return of(filteredComments);
  }

  getRootCommentsBySolution(solutionId: number): Observable<SolutionComment[]> {
    const filteredComments = this.comments.filter(comment => comment.solutionId === solutionId && comment.parentId === null);
    return of(filteredComments);
  }

  getRepliesByCommentId(commentId: number): Observable<SolutionComment[]> {
    const filteredComments = this.comments.filter(comment => comment.parentId === commentId);
    return of(filteredComments);
  }

  getCommentById(commentId: number): Observable<SolutionComment | undefined> {
    return of(this.comments.find(comment => comment.id === commentId))
  }

  addComment({ content, solutionId, parentId, userId }: { content: string; solutionId: number; parentId: number | null; userId: number }): Observable<SolutionComment> {
    const comment: SolutionComment = {
      id: this.comments.length + 1,
      solutionId,
      parentId,
      content,
      userId, // Thêm userId
      createdAt: new Date(),
      updatedAt: new Date(),
      downvotes: 0,
      upvotes: 0,
    };

    this.comments.push(comment);
    return of(comment);
  }



  // Cập nhật comment
  updateComment(comment: SolutionComment): Observable<SolutionComment> {
    const index = this.comments.findIndex(c => c.id === comment.id);
    if (index !== -1) {
      comment.updatedAt = new Date();
      this.comments[index] = comment;
    }
    return of(comment);
  }

  // Xóa comment
  deleteComment(commentId: number): Observable<void> {
    this.comments = this.comments.filter(comment => comment.id !== commentId);
    return of();
  }
}

