import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl + '/auth'
  constructor(
    private readonly http: HttpClient
  ) { }

  public checkAuth() { }
  public getProfile() {

  }
}
