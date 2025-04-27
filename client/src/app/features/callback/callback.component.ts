import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {
  constructor(private router: Router) {
    const redirectUrl = localStorage.getItem('redirectUrl') || '/'
    window.location.href = redirectUrl;
  }
}
