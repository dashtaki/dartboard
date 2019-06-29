import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {Login} from '../models/login.model';
import * as userActions from '../../store/actions/user.action';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import {CreateGame} from '../models/create-game.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private store: Store<fromRoot.State>) {
  }

  public login(username: string, password: any): Observable<any> {
    const loginRequestBody: Login = {
      client_id: 2,
      client_secret: 'QuOYVk5DsIzSUWYSObvufBiWs6EIBIbTsbHHDWTf',
      grant_type: 'password',
      username: username,
      password: password
    };

    return this.http.post<any>(`/oauth/token`, loginRequestBody);
  }

  public logout(): void {
    this.store.dispatch(new userActions.AuthenticateAction(false));
    localStorage.removeItem('userInfo');
  }

  public getUserProfile(): Observable<User> {
    return this.http.get<any>('/api/me');
  }

  public editUserProfile(editedData: any): Observable<any> {
    return this.http.put<any>('/api/me', editedData);
  }

  public createGame(targetScore: CreateGame): Observable<any> {
    return this.http.post<any>('/api/game', targetScore);
  }

  public joinGame(gameId: number): Observable<any> {
    return this.http.post<any>(`/api/game/${gameId}/join`, {});
  }

  public leaveGame(gameId: number) {
    return this.http.delete(`/api/game/${gameId}/left`);
  }
}
