import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RunnerTestCase } from '../../features/runner/runner.component';

@Injectable({
  providedIn: 'root'
})
export class RunnerService {
  private apiUrl = 'http://localhost:8080/api/run'; // Thay đổi nếu backend có URL khác

  constructor(private http: HttpClient) { }

  runPython(code: string, testCases: RunnerTestCase[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/python`, { code, testCases });
  }

  runCpp(code: string, testCases: RunnerTestCase[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cpp`, { code, testCases });
  }
}

