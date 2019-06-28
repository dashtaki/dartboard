import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    });


    return next.handle(authReq).pipe(catchError(err => {
      if (err.status === 401) {
        console.log('should navigate to login page ....')
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
