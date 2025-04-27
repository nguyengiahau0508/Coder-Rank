import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly apiUrl = environment.apiUrl;

  loginWithGoogle() {
    window.location.href = `${this.apiUrl}/auth/google`;
  }
}
