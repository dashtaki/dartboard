import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from './models/game';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http: HttpClient) {
  }

  public getGameById(gameId: number): Observable<Game> {
    return this.http.get<Game>(`/api/game/${gameId}`);
  }

}
