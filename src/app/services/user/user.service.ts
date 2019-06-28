import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public login(clientId: number, clientSecret: string, username: string, password: string) {
    return this.http.post<any>(`/oaut/token`,
      {
        // client_id: clientId,
        // client_secret: clientSecret,
        username: username,
        password: password,
        grant_type: 'password'
      })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('userInfo', JSON.stringify(user));
        }
        return user;
      }));
  }

  public logout() {
    localStorage.removeItem('userInfo');
  }
}
