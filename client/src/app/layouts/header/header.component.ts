import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SharedService } from "../../core/services/shared/shared.service";
import { User } from "../../core/models/user.model";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink]
})
export class HeaderComponent implements OnInit {
  @Output() login = new EventEmitter<void>()
  constructor(
    private sharedService: SharedService,
    private authService: AuthService
  ) { }
  user: User | null = null

  ngOnInit(): void {
    this.sharedService.globalUser$.subscribe(value => {
      this.user = value
    })
  }

  onLogin() {
    this.login.emit()
  }

  onLogout() {
    this.sharedService.updateGlobalUser(null)
    this.authService.logout().subscribe()
  }
}
