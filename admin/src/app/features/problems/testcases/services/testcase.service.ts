import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Testcase } from "../models/testcase.model";
import { PageMeta } from "../../../../shareds/models/page-meta.model";

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  private readonly apiUrl = environment.apiUrl + '/testcases';
  constructor(
    private readonly http: HttpClient,
  ) { }

  getTestCases(page: number = 1, take: number = 10, problemId: number, isSample: string = ''): Observable<{ data: Testcase[], meta: PageMeta }> {
    return this.http.get<{ data: Testcase[], meta: PageMeta }>(`${this.apiUrl}/admin`, {
      params: {
        problemId: problemId.toString(),
        page: page.toString(),
        take: take.toString(),
        isSample: isSample
      }
    });
  }

  saveManyTestCase(testcases: Testcase[]): Observable<{ data: { status: string } }> {
    return this.http.post<{ data: { status: string } }>(this.apiUrl + '/admin', { testcases });
  }

  createTestCase(testcase: Testcase): Observable<{ data: Testcase }> {
    return this.http.post<{ data: Testcase }>(this.apiUrl + '/admin', testcase);
  }

  updateTestCase(id: number, testcase: Testcase): Observable<{ data: Testcase }> {
    return this.http.patch<{ data: Testcase }>(this.apiUrl + `/${id}/admin`, testcase);
  }

  deleteTestCase(id: number): Observable<{ data: { status: string } }> {
    return this.http.delete<{ data: { status: string } }>(this.apiUrl + `/${id}/admin`);
  }
}
