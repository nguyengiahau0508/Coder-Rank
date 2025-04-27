import { Injectable } from "@angular/core";
import { Problem } from "../models/problem.model";
import { sampleProblems } from "../../mock/problems.sample";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { PageMeta } from "../models/page-meta.model";

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {
  private problems: Problem[] = sampleProblems;

  private readonly apiUrl = environment.apiUrl + '/problems'

  constructor(
    private http: HttpClient
  ) { }

  // Lấy danh sách bài toán với phân trang và lọc theo tagIds
  getAllProblems(page: number = 1, take: number = 10, tagIds: number[] = [], difficulty: string | null): Observable<{
    data: Problem[],
    meta: PageMeta
  }> {
    let params = new HttpParams()
      .set('page', page)
      .set('take', take);

    tagIds.forEach(id => {
      params = params.append('tagIds', id);
    });

    if (difficulty) {
      params = params.append('difficulty', difficulty)
    }

    return this.http.get<{
      data: Problem[],
      meta: PageMeta
    }>(this.apiUrl, { params });
  }

  // Lấy bài toán theo ID
  getProblemById(id: number): Observable<{ data: Problem | null }> {
    return this.http.get<{ data: Problem | null }>(this.apiUrl + `/${id}`);
  }

  getProblemTitleById(id: number) {
    return this.problems.find(problem => problem.id === id)?.title
  }

  getProblemByContestId(contestId: number): Observable<{ data: Problem[] }> {
    return this.http.get<{ data: Problem[] }>(this.apiUrl + `/contest/${contestId}`);
  }

  // Thêm một bài toán mới
  addProblem(newProblem: Problem): void {
    this.problems.push(newProblem);
  }

  // Cập nhật thông tin bài toán theo ID
  updateProblem(id: number, updatedProblem: Partial<Problem>): boolean {
    const index = this.problems.findIndex(problem => problem.id === id);
    if (index !== -1) {
      this.problems[index] = { ...this.problems[index], ...updatedProblem };
      return true;
    }
    return false;
  }

  // Xóa bài toán theo ID
  deleteProblem(id: number): boolean {
    const initialLength = this.problems.length;
    this.problems = this.problems.filter(problem => problem.id !== id);
    return this.problems.length < initialLength;
  }
}

