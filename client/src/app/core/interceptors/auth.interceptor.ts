import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared/shared.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const sharedService = inject(SharedService)
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.openLoginModal();
      }
      return throwError(() => error);
    })
  );
};

