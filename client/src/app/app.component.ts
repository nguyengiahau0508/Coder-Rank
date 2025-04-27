import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { AuthService } from './core/services/auth.service';
import { SharedService } from './core/services/shared/shared.service';
import { TitleService } from './core/services/shared/title.service';
import { FooterComponent } from './layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public isOpenningLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private titleService: TitleService
  ) {
    this.loadUserProfile()
  }

  ngOnInit(): void {
    this.sharedService.golobalIsOpenningLoginForm$.subscribe(value => {
      this.isOpenningLogin = value
    })
  }

  private loadUserProfile() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.sharedService.updateGlobalUser(response.data)
      },
      error: (err) => {
        if (err.status == 401) {
          this.authService.refreshToken().subscribe({
            next: () => {
              this.loadUserProfile()
            },
            error: () => {
              this.sharedService.updateGlobalIsOpenningLoginForm(true)
            }
          })
        }
      }
    });
  }

  public onOpenLogin() {
    this.titleService.setTitle('Login')
    this.sharedService.updateGlobalIsOpenningLoginForm(true)
  }

  public onCloseLogin() {
    this.titleService.setTitle('')
    this.sharedService.updateGlobalIsOpenningLoginForm(false)
  }
}
