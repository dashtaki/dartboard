import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let userToken = JSON.parse(localStorage.getItem('userInfo'));
    let bearerToken = null;

    function isTokenExpired() {
      if (userToken) {
        let timestamp = JSON.parse(JSON.stringify(userToken))['expires_in'];
        let tokenDate = new Date(timestamp).getHours() + ':' + new Date(timestamp).getMinutes() + ':' + new Date(timestamp).getSeconds();
        let currentDate = convertHour() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
        return compareTimes(new Date(tokenDate), new Date(currentDate));
      }
    }

    function convertHour() {
      let hour = new Date().getHours();
      if (hour === 0) {
        return 12;
      } else {
        return hour > 12 ? hour - 12 : hour;
      }
    }

    function compareTimes(tokenTime: Date, currentTime: Date) {
      return tokenTime.getHours() <= currentTime.getHours() && tokenTime.getMinutes() <= currentTime.getMinutes() && tokenTime.getSeconds() <= currentTime.getSeconds();
    }

    if (userToken) {
      if (isTokenExpired()) {
        bearerToken = `Bearer ${userToken.refresh_token}`
      }
      bearerToken = `Bearer ${userToken.access_token}`;
      request = request.clone({
        setHeaders: {
          Authorization: bearerToken
        }
      });
    }

    return next.handle(request);
  }
}
