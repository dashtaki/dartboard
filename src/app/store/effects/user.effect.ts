import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as userActions from '../actions/user.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router) {
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

  @Effect()
  creatGame$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.CREATE_GAME),
    map((action: userActions.CreateGameAction) => action.payload),
    switchMap(targetScore => {
      return this.userService.createGame(targetScore).pipe(
        map((success) => new userActions.CreateGameSuccessAction(success)),
        catchError((error) => of(new userActions.CreateGameFailAction(error)))
      );
    })
  );

  @Effect()
  joinGame$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.JOIN_GAME),
    map((action: userActions.JoinGameAction) => action.payload),
    switchMap(gameId => {
      return this.userService.joinGame(gameId).pipe(
        map((success) => new userActions.JoinGameSuccessAction(success)),
        catchError((error) => of(new userActions.JoinGameFailAction(error)))
      );
    })
  );

  @Effect({dispatch: false})
  joinGameSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.JOIN_GAME_SUCCESS),
    tap(() => {
      console.log('you joined the game successfully.')
    })
  );

  @Effect()
  getProfileInfo$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.GET_PROFILE_INFO),
    switchMap(() => {
      return this.userService.getUserProfile().pipe(
        map((success) => new userActions.GetProfileInfoSuccessAction(success)),
        catchError((error) => of(new userActions.GetProfileInfoFailAction(error)))
      );
    })
  );

  @Effect()
  setProfileInfo$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.SET_PROFILE_INFO),
    map((action: userActions.SetProfileInfoAction) => action.payload),
    switchMap((editedData) => {
      return this.userService.editUserProfile(editedData).pipe(
        map((success) => new userActions.SetProfileInfoSuccessAction(success)),
        catchError((error) => of(new userActions.SetProfileInfoFailAction(error)))
      );
    })
  );

  @Effect()
  leaveGame$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.LEAVE_GAME),
    map((action: userActions.LeaveGameAction) => action.payload),
    switchMap((gameId) => {
      return this.userService.leaveGame(gameId)
        .pipe(
          map((success) => new userActions.LeaveGameSuccessAction(success)),
          catchError((error) => of(new userActions.LeaveGameFailAction(error)))
        );
    })
  );

  @Effect({dispatch: false})
  leaveGameSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.LEAVE_GAME_SUCCESS),
    tap(() => {
      console.log('you leaved the game successfully.');
      this.router.navigate(['./games']);
    })
  );

  @Effect()
  inviteGame$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.INVITE_GAME),
    map((action: userActions.InviteGameAction) => action.payload),
    switchMap((data) => {
      return this.userService.inviteGame(data)
        .pipe(
          map((success) => new userActions.LeaveGameSuccessAction(success)),
          catchError((error) => of(new userActions.LeaveGameFailAction(error)))
        );
    })
  );

  @Effect()
  kickGame$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.KICK_GAME),
    map((action: userActions.KickGameAction) => action.payload),
    switchMap((data) => {
      return this.userService.kickUser(data)
        .pipe(
          map((success) => new userActions.KickGameSuccessAction(success)),
          catchError((error) => of(new userActions.KickGameFailAction(error)))
        );
    })
  );

}


