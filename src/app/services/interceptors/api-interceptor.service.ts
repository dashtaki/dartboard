import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UtilityService} from '../utility.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private router: Router, private utilityService: UtilityService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    });


    return next.handle(authReq).pipe(catchError(err => {
      if (err) {
        if (err.status === 401 || err.status === 404) {
          this.router.navigate(['./login']);
        } else if (err.status === 504) {
          let msg = err.statusText === 'Gateway Timeout' ? 'Check your internet connection and try again' : err.statusText;
          this.utilityService.showAlert(msg);
        } else {
          this.utilityService.showAlert(err.statusText);
        }
      }


      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
