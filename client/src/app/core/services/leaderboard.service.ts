import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Leaderboard } from "../models/leader-board.model";
import { PageMeta } from "../models/page-meta.model";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private readonly apiUrl = environment.apiUrl + '/leader-boards';
  constructor(
    private readonly http: HttpClient
  ) { }

  getLeaderBoard(contestId: number, page: number = 1, take: number = 100): Observable<{ data: Leaderboard[], meta: PageMeta }> {
    return this.http.get<{ data: Leaderboard[], meta: PageMeta }>(`${this.apiUrl}/${contestId}`, {
      params: {
        page: page.toString(),
        take: take.toString()
      }
    });
  }

  getTableRanking(): Observable<{ data: Leaderboard[] }> {
    return this.http.get<{ data: Leaderboard[] }>(`${this.apiUrl}/user/table-ranks`, { withCredentials: true });
  }
}
