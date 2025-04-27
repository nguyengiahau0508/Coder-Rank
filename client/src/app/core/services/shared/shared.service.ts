import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root', // Đảm bảo service này được sử dụng toàn cục
})
export class SharedService {
  private user = new BehaviorSubject<User | null>(null);
  globalUser$ = this.user.asObservable();

  updateGlobalUser(newValue: User | null) {
    this.user.next(newValue);
  }

  private isOpenningLoginForm = new BehaviorSubject<boolean>(false);
  golobalIsOpenningLoginForm$ = this.isOpenningLoginForm.asObservable();

  updateGlobalIsOpenningLoginForm(newValue: boolean) {
    this.isOpenningLoginForm.next(newValue)
  }
}

