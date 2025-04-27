import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { responseInterceptor } from './core/interceptors/response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    // config router
    provideRouter(routes),

    // config http client
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        responseInterceptor
      ]),
    ),

    // config ngx-toastr
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers

  ]
};
