import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as userActions from '../actions/user.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UserService} from "../../services/user/user.service";


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService) {
  }

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.LOGIN),
    map((action: userActions.LoginAction) => action.payload),
    switchMap(data => {
      return this.userService.login(data.username, data.password).pipe(
        map((success) => new userActions.LoginSuccessAction(success)),
        catchError((error) => of(new userActions.LoginFailAction(error)))
      );
    })
  );

}


