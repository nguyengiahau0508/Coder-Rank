import { HttpInterceptorFn } from '@angular/common/http';
import { map } from 'rxjs';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event: any) => {
      if (event.body && event.body.metadata && event.body.metadata.data) {
        return Object.assign(event, { body: event.body.metadata });
      }
      return event;
    })
  );
};
