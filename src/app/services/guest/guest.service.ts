import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game';
import {Observable} from 'rxjs';
import {AllUsers} from "../models/all-users.model";
import {AllGames} from "../models/all-games.model";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http: HttpClient) {
  }

  public getGameById(gameId: number): Observable<Game> {
    return this.http.get<Game>(`/api/game/${gameId}`);
  }

  public getAllGames(pageNumber: number): Observable<AllGames> {
    return this.http.get<AllGames>(`/api/game?page=${pageNumber}`);
  }

  public getAllUsers(pageNumber: number): Observable<AllUsers> {
    return this.http.get<AllUsers>(`/api/user?page=${pageNumber}`);
  }

  public register(payload): Observable<any> {
    return this.http.post<any>('/api/user', payload);
  }
}
