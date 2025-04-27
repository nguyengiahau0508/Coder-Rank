import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';  // Cập nhật API URL backend
  isLoginModalOpen = signal(false);

  openLoginModal() {
    this.isLoginModalOpen.set(true);
  }

  closeLoginModal() {
    this.isLoginModalOpen.set(false);
  }
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // Xử lý redirect sau khi đăng nhập thành công
  redirectAfterLogin() {
    // Nếu có URL cũ (lưu trong localStorage), chuyển hướng về đó
    const redirectUrl = localStorage.getItem('redirectUrl');
    if (redirectUrl) {
      this.router.navigateByUrl(redirectUrl);  // Chuyển hướng người dùng về URL cũ
      localStorage.removeItem('redirectUrl');  // Xóa URL đã lưu
    } else {
      this.router.navigate(['/dashboard']);  // Nếu không có URL cũ, chuyển hướng đến dashboard
    }
  }

  // Đăng nhập bằng tài khoản nội bộ (email/password)
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/local/login`, { email, password }, { withCredentials: true });
  }

  // Đăng nhập bằng Google
  loginWithGoogle(): Observable<any> {
    window.location.href = `${this.apiUrl}/google`;
    return new Observable();  // Trả về Observable rỗng vì việc redirect sẽ xử lý bên backend
  }

  // Đăng nhập bằng GitHub
  loginWithGithub(): Observable<any> {
    window.location.href = `${this.apiUrl}/github`;
    return new Observable();  // Trả về Observable rỗng vì việc redirect sẽ xử lý bên backend
  }

  // Đăng xuất
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/local/logout`, {}, { withCredentials: true });
  }

  // Làm mới token
  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, {}, { withCredentials: true });
  }

  // Lấy thông tin người dùng (profile)
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { withCredentials: true });
  }
}

