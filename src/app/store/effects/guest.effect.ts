import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as guestActions from '../actions/guest.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {GuestService} from '../../services/guest/guest.service';


@Injectable()
export class GuestEffect {
  constructor(
    private actions$: Actions,
    private guestService: GuestService) {
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

}


