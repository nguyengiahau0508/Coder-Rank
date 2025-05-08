import {Component} from '@angular/core';

@Component({
  selector: 'app-email-verify',
  standalone: true,
  imports: [],
  templateUrl: './email-verify.component.html',
  styleUrl: './email-verify.component.css'
})
export class EmailVerifyComponent {
  resendEmail() {
    // TODO: Gọi API gửi lại email xác nhận
    console.log('Gửi lại email xác nhận...');
  }
}
