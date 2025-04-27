import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contest } from "../models/contest.model";
import { PageMeta } from "../../../shareds/models/page-meta.model";
@Injectable({ providedIn: 'root' })
export class ContestsService {
  private readonly apiUrl = environment.apiUrl + '/contests';
  constructor(
    private readonly http: HttpClient
  ) { }

  getContests(page: number = 10, take: number = 10, searchTerm: string = '', status: string = ''): Observable<{ data: Contest[], meta: PageMeta }> {
    return this.http.get<{ data: Contest[], meta: PageMeta }>(this.apiUrl + '/admin', {
      params: {
        page: page.toString(),
        take: take.toString(),
        searchTerm,
        status
      }
    });
  }

  createContest(contest: Contest, file?: File): Observable<{ data: Contest }> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('data', JSON.stringify(contest));
    return this.http.post<{ data: Contest }>(this.apiUrl + '/admin', formData);
  }

  getContestById(id: number): Observable<{ data: Contest }> {
    return this.http.get<{ data: Contest }>(this.apiUrl + '/' + id + '/admin');
  }

  updateContest(contest: Contest, file?: File): Observable<{ data: Contest }> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('data', JSON.stringify(contest));
    return this.http.patch<{ data: Contest }>(this.apiUrl + '/' + contest.id, formData);
  }
}
