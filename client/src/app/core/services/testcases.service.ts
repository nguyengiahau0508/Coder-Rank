import { Injectable } from '@angular/core';
import { Testcase } from '../models/testcase.model';
import { sampleTestcases } from '../../mock/testcases.sample';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestcaseService {
  private testcases: Testcase[] = sampleTestcases
  private readonly apiUrl = environment.apiUrl + '/testcases'
  constructor(
    private readonly http: HttpClient
  ) { }

  getTestCaseSampleByProblemId(problemId: number): Observable<{ data: Testcase[] }> {
    return this.http.get<{ data: Testcase[] }>(this.apiUrl + `/problem/${problemId}/sample`)
  }

  getTotalTestcaseByProblemId(problemId: number): Observable<{ data: number }> {
    return this.http.get<{ data: number }>(this.apiUrl + `/problem/${problemId}/total`)
  }
}

