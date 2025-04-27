import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function responseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    map((event: any) => {
      if (event.body && event.body.metadata && event.body.metadata.data) {
        return Object.assign(event, { body: event.body.metadata });
      }
      return event;
    })
  );
}
