import { Injectable } from "@angular/core";
import { sampleUsers } from "../../mock/users.sample";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = sampleUsers
  private apiUrl = 'http://localhost:8080/api/auth';  // Cập nhật API URL backend

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUsernameById(userId: number): Observable<string | undefined> {
    return of(this.users.find(user => user.id === userId)?.username);
  }

  getNameById(userId: number): Observable<string | undefined> {
    return of(this.users.find(user => user.id === userId)?.name);
  }

  getAvartaById(userId: number): Observable<string | undefined> {
    return of(this.users.find(user => user.id === userId)?.avatar);
  }
}
