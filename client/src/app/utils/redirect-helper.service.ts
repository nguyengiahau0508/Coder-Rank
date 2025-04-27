import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectHelperService {
  private static REDIRECT_URL_KEY = 'redirectUrl';

  constructor(private router: Router) { }

  // Lưu lại URL hiện tại để chuyển hướng lại sau khi hoàn thành tác vụ
  saveRedirectUrl(url: string): void {
    sessionStorage.setItem(RedirectHelperService.REDIRECT_URL_KEY, url);
  }

  // Lấy URL đã lưu từ sessionStorage
  getRedirectUrl(): string | null {
    return sessionStorage.getItem(RedirectHelperService.REDIRECT_URL_KEY);
  }

  // Xóa URL đã lưu sau khi chuyển hướng
  clearRedirectUrl(): void {
    sessionStorage.removeItem(RedirectHelperService.REDIRECT_URL_KEY);
  }

  // Thực hiện chuyển hướng về trang đã lưu sau khi hoàn thành tác vụ
  redirectToSavedUrl(): void {
    const redirectUrl = this.getRedirectUrl();
    if (redirectUrl) {
      this.clearRedirectUrl(); // Xóa URL đã lưu sau khi chuyển hướng
      this.router.navigate([redirectUrl]);
    } else {
      this.router.navigate(['/dashboard']); // Nếu không có URL đã lưu, chuyển hướng đến trang mặc định
    }
  }
}

