import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    });


    return next.handle(authReq).pipe(catchError(err => {
      if (err.status === 401) {
        this.router.navigate(['./login']);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
