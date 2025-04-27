import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CodeEditorModule } from '@ngstack/code-editor';
import { provideMarkdown } from 'ngx-markdown'
import { NgxEditorModule } from 'ngx-editor'
import { provideHighlightOptions } from 'ngx-highlightjs'
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { responseInterceptor } from './core/interceptors/response.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        AuthInterceptor,
        responseInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideMarkdown(),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js')
    }),
    importProvidersFrom(CodeEditorModule.forRoot()),
    importProvidersFrom(NgxEditorModule.forRoot()),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js'),
    }),
    provideAnimations(), // required animations providers
    provideToastr(),
    provideCharts(withDefaultRegisterables()),
  ]
};
