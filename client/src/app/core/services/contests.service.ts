import { Injectable } from "@angular/core";
import { sampleContests } from "../../mock/contests.sample";
import { Contest } from "../models/contest.model";
import { PageMeta } from "../models/page-meta.model";
import { Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  //private contests = sampleContests
  private readonly apiUrl = environment.apiUrl + '/contests';
  constructor(
    private readonly http: HttpClient
  ) { }


  getAllContests(page: number = 1, pageSize: number = 10): Observable<{ data: Contest[]; meta: PageMeta }> {
    // const startIndex = (page - 1) * pageSize;
    // return of({
    //   data: this.contests.slice(startIndex, startIndex + pageSize),
    //   meta: {
    //     page,
    //     take: pageSize,
    //     itemCount: this.contests.length,
    //     pageCount: Math.ceil(this.contests.length / pageSize),
    //     hasPreviousPage: page > 1,
    //     hasNextPage: page < Math.ceil(this.contests.length / pageSize)
    //   }
    // });
    //
    return this.http.get<{ data: Contest[], meta: PageMeta }>(this.apiUrl + '/finished', {
      params: {
        page: page.toString(),
        take: pageSize.toString()
      }
    })
  }

  getUpcomingContests(page: number, pageSize: number): Observable<{ data: Contest[]; meta: PageMeta }> {
    return this.http.get<{ data: Contest[], meta: PageMeta }>(this.apiUrl + '/upcoming', {
      params: {
        page: page.toString(),
        take: pageSize.toString()
      }
    })
  }

  getOngoingContests(page: number, pageSize: number): Observable<{ data: Contest[]; meta: PageMeta }> {
    return this.http.get<{ data: Contest[], meta: PageMeta }>(this.apiUrl + '/ongoing', {
      params: {
        page: page.toString(),
        take: pageSize.toString()
      }
    })
  }

  getContestById(id: number): Observable<{ data: Contest }> {
    return this.http.get<{ data: Contest }>(`${this.apiUrl}/${id}`);
  }

  registerContest(id: number): Observable<{ data: Contest }> {
    return this.http.post<{ data: Contest }>(`${this.apiUrl}/${id}/register`, {}, { withCredentials: true });
  }

  isContestRegistered(id: number): Observable<{ data: boolean }> {
    return this.http.get<{ data: boolean }>(`${this.apiUrl}/${id}/is-registered`, { withCredentials: true });
  }
}
