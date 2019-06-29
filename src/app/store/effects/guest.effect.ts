import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as guestActions from '../actions/guest.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {GuestService} from '../../services/guest/guest.service';
import {Router} from '@angular/router';


@Injectable()
export class GuestEffect {
  constructor(
    private actions$: Actions,
    private guestService: GuestService,
    private router: Router) {
  }

  @Effect()
  allGames$: Observable<Action> = this.actions$.pipe(
    ofType(guestActions.ALL_GAMES),
    map((action: guestActions.AllGamesAction) => action.payload),
    switchMap(pageNumber => {
      return this.guestService.getAllGames(pageNumber).pipe(
        map((success) => new guestActions.AllGamesSuccessAction(success)),
        catchError((error) => of(new guestActions.AllGamesFailAction(error)))
      );
    })
  );

  @Effect()
  Game$: Observable<Action> = this.actions$.pipe(
    ofType(guestActions.GAME),
    map((action: guestActions.GameAction) => action.payload),
    switchMap(gameId => {
      return this.guestService.getGameById(gameId).pipe(
        map((success) => new guestActions.GameSuccessAction(success)),
        catchError((error) => of(new guestActions.GameFailAction(error)))
      );
    })
  );

  @Effect()
  allUsers$: Observable<Action> = this.actions$.pipe(
    ofType(guestActions.ALL_USERS),
    map((action: guestActions.AllUsersAction) => action.payload),
    switchMap(pageNumber => {
      return this.guestService.getAllUsers(pageNumber).pipe(
        map((success) => new guestActions.AllUsersSuccessAction(success)),
        catchError((error) => of(new guestActions.AllUsersFailAction(error)))
      );
    })
  );

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType(guestActions.REGISTER),
    map((action: guestActions.RegisterAction) => action.payload),
    switchMap(data => {
      return this.guestService.register(data).pipe(
        map((success) => new guestActions.RegisterSuccessAction(success)),
        catchError((error) => of(new guestActions.RegisterFailAction(error)))
      );
    })
  );

  @Effect({dispatch: false})
  registerSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(guestActions.REGISTER_SUCCESS),
    tap(() => this.router.navigate(['./login']))
  );

}
