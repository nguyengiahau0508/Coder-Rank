import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageMeta } from '../models/page-meta.model';
import { Comment } from '../models/comment.model';
import { environment } from '../../../environments/environment';
@Injectable(
  {
    providedIn: 'root',
  }
)
export class CommentsService {
  private apiUrl = environment.apiUrl + '/comments';
  constructor(
    private readonly http: HttpClient
  ) { }

  createComment(comment: Comment): Observable<{ data: Comment }> {
    return this.http.post<
      { data: Comment }
    >(this.apiUrl, comment, { withCredentials: true });
  }

  getCommentsBySolutionId(page: number, take: number, solutionId: number): Observable<{ data: Comment[], meta: PageMeta }> {
    return this.http.get<
      { data: Comment[], meta: PageMeta }
    >(this.apiUrl + '/solution/' + solutionId);
  }

  getCommentsByRootId(page: number, take: number, rootId: number): Observable<{ data: Comment[], meta: PageMeta }> {
    return this.http.get<
      { data: Comment[], meta: PageMeta }
    >(this.apiUrl + '/root/' + rootId);
  }
}
