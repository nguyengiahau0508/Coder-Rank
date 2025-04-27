import { Component, EventEmitter, inject, Output } from "@angular/core";
import { RedirectHelperService } from "../../../../utils/redirect-helper.service";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService)
  private redirecHelper = inject(RedirectHelperService)

  @Output() close = new EventEmitter<void>()

  private saveCurrentUrl() {
    const currentUrl = window.location.href // Hoặc this.redirecHelper.getCurrentUrl() nếu có
    localStorage.setItem('redirectUrl', currentUrl)
  }

  public login(email: string, password: string) {
    this.saveCurrentUrl()
    return this.authService.login(email, password)
  }

  public loginWithGoogle() {
    this.saveCurrentUrl()
    return this.authService.loginWithGoogle()
  }

  public loginWithGithub() {
    this.saveCurrentUrl()
    return this.authService.loginWithGithub()
  }

  public onClose() {
    this.close.emit()
  }
}
