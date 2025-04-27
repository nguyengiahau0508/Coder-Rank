import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Problem } from "../models/problem.models";
import { PageMeta } from "../../../shareds/models/page-meta.model";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProblemsService {
  private readonly apiUrl = environment.apiUrl + "/problems";
  constructor(
    private readonly http: HttpClient
  ) { }

  createProblem(problem: Problem): Observable<{ data: Problem }> {
    return this.http.post<{ data: Problem }>(this.apiUrl + '/admin', problem);
  }

  getProblems(page: number = 1, take: number = 10, isPublic: boolean | string = '', searchTerm: string = ''): Observable<{ data: Problem[], meta: PageMeta }> {
    return this.http.get<{ data: Problem[], meta: PageMeta }>(this.apiUrl + '/admin', {
      params: {
        page: page.toString(),
        take: take.toString(),
        isPublic: isPublic.toString(),
        searchTerm: searchTerm
      }
    });
  }

  getAllPrivateProblem(searchTerm: string = ''): Observable<{ data: Problem[] }> {
    return this.http.get<{ data: Problem[] }>(this.apiUrl + '/private/admin', { params: { searchTerm } });
  }

  getProblem(id: number): Observable<{ data: Problem }> {
    return this.http.get<{ data: Problem }>(this.apiUrl + '/' + id);
  }

  updateProblem(id: number, problem: Problem): Observable<{ data: Problem }> {
    return this.http.patch<{ data: Problem }>(this.apiUrl + '/' + id, problem);
  }

  toggleContestStatus(id: number): Observable<void> {
    return this.http.put<void>(this.apiUrl + '/' + id + '/contest-status', {});
  }
}
