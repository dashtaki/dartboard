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
    this.store.dispatch(new userActions.UpdateUserNameAction(null))
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

  public inviteGame(data: any): Observable<any> {
    const requestBody = {
      user_id: data.userId
    };
    return this.http.post<any>(`/api/game/${data.gameId}/invite`, requestBody);
  }

  public kickUser(data: any): Observable<any> {
    const requestBody = {
      user_id: data.userId
    };
    return this.http.post(`/api/game/${data.gameId}/kick`, requestBody);
  }

  public addGameScore(data: any): Observable<any> {
    const requestBody = {
      score: data.score
    };
    return this.http.post(`/api/game/${data.gameId}/score`, requestBody);
  }

  public updateGame(data: any): Observable<any> {
    const requestBody = {
      target_score: data.targetScore
    };
    return this.http.put(`/api/game/${data.gameId}`, requestBody);
  }
}
