import { Injectable } from "@angular/core";
import { Submission } from "../models/submission.model";
import { sampleSubmissions } from "../../mock/submissions.sample";
import { PageMeta } from "../models/page-meta.model";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {
  private apiUrl = environment.apiUrl + '/submissions'
  private submissions: Submission[] = sampleSubmissions

  constructor(
    private readonly http: HttpClient
  ) { }

  submitCode(language: string, code: string, problemId: number) {
    return this.http.post(this.apiUrl, {
      language, code, problemId
    }, { withCredentials: true })
  }

  getUserSubmissionForProblem(userId: number, problemId: number, page: number = 1, take: number = 10): Observable<{
    data: Submission[],
    meta: PageMeta
  }> {
    let params = new HttpParams()
      .set('page', page)
      .set('take', take);

    return this.http.get<{
      data: Submission[],
      meta: PageMeta
    }>(this.apiUrl + `/user/${userId}/problem/${problemId}`, { params, withCredentials: true })
  }

  getUserSubmissionDetailForProblem(userId: number, submissionId: number): Observable<{ data: Submission }> {
    return this.http.get<{ data: Submission }>(this.apiUrl + `/${submissionId}/user/${userId}`, { withCredentials: true })
  }

  getLastSumissionCorrectByProblemId(problemId: number): Observable<{
    data: Submission
  }> {
    return this.http.get<{
      data: Submission
    }>(this.apiUrl + `/last-correct/problem/${problemId}`, { withCredentials: true })
  }

  getStatus(contestId: number, userId: number, problemId: number): Observable<{ data: { status: string, total: number } }> {
    return this.http.get<{ data: { status: string, total: number } }>(this.apiUrl + `/status`, {
      params: {
        contestId: contestId.toString(),
        userId: userId.toString(),
        problemId: problemId.toString()
      },
    })
  }

  getAllSubmission(page: number = 1, take: number = 10): Observable<{
    data: Submission[],
    meta: PageMeta
  }> {
    let params = new HttpParams()
      .set('page', page)
      .set('take', take);

    return this.http.get<{
      data: Submission[],
      meta: PageMeta
    }>(this.apiUrl, { params })
  }

  getAllSubmissionInYear(year: number): Observable<{
    data: Submission[],
  }> {
    let params = new HttpParams()
      .set('year', year.toString());
    return this.http.get<{
      data: Submission[],
    }>(this.apiUrl + '/all-in-year', { params, withCredentials: true })
  }

  getSubmissionById(id: number): Submission | undefined {
    return this.submissions.find(submission => submission.id === id)
  }

  getSubmissionsByProblemId(problemId: number): Submission[] {
    return this.submissions.filter(submission => submission.problemId === problemId)
  }

  getSubmissionCountByProblemId(problemId: number): number {
    return this.submissions.filter(submission => submission.problemId === problemId).length;
  }

  getSubmissions(page: number, pageSize: number): { data: Submission[], meta: PageMeta } {

    const startIndex = (page - 1) * pageSize;
    return {
      data: this.submissions.slice(startIndex, startIndex + pageSize),
      meta: {
        page,
        take: pageSize,
        itemCount: this.submissions.length,
        pageCount: Math.ceil(this.submissions.length / pageSize),
        hasPreviousPage: page > 1,
        hasNextPage: page < Math.ceil(this.submissions.length / pageSize)
      }
    }
  }

  getLastSumissionsCorrectByUserIdAndProblemId({ userId, problemId }: { userId: number; problemId: number }): Observable<Submission | undefined> {
    return of(this.submissions
      .filter(sub => sub.userId === userId && sub.problemId === problemId && sub.status === 'accepted')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null)
  }
}
