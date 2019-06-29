import {Action} from '@ngrx/store';
import {CreateGame} from "../../services/models/create-game.model";

export const LOGIN = '[User] Login';
export const LOGIN_SUCCESS = '[User] Login Success';
export const LOGIN_FAIL = '[User] Login Fail';

export const AUTHENTICATE = '[User] Authenticate';

export const CREATE_GAME = '[User] Create Game';
export const CREATE_GAME_SUCCESS = '[User] Create Game Success';
export const CREATE_GAME_FAIL = '[User] Create Game Fail';

export const JOIN_GAME = '[User] Join Game';
export const JOIN_GAME_SUCCESS = '[User] Join Game Success';
export const JOIN_GAME_FAIL = '[User] Join Game Fail';

export const PROFILE_INFO = '[User] Profile Info';
export const PROFILE_INFO_SUCCESS = '[User] Profile Info Success';
export const PROFILE_INFO_FAIL = '[User] Profile Info Fail';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: any) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: any) {
  }
}

export class AuthenticateAction implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload: boolean) {
  }
}

export class CreateGameAction implements Action {
  readonly type = CREATE_GAME;

  constructor(public payload: CreateGame) {
  }
}

export class CreateGameSuccessAction implements Action {
  readonly type = CREATE_GAME_SUCCESS;

  constructor(public payload: any) {
  }
}

export class CreateGameFailAction implements Action {
  readonly type = CREATE_GAME_FAIL;

  constructor(public payload: any) {
  }
}

export class JoinGameAction implements Action {
  readonly type = JOIN_GAME;

  constructor(public payload: number) {
  }
}

export class JoinGameSuccessAction implements Action {
  readonly type = JOIN_GAME_SUCCESS;

  constructor(public payload: any) {
  }
}

export class JoinGameFailAction implements Action {
  readonly type = JOIN_GAME_FAIL;

  constructor(public payload: any) {
  }
}

export class ProfileInfoAction implements Action {
  readonly type = PROFILE_INFO;
}

export class ProfileInfoSuccessAction implements Action {
  readonly type = PROFILE_INFO_SUCCESS;

  constructor(public payload: any) {
  }
}

export class ProfileInfoFailAction implements Action {
  readonly type = PROFILE_INFO_FAIL;

  constructor(public payload: any) {
  }
}

export type Actions =
  LoginAction
  | LoginFailAction
  | LoginSuccessAction
  | AuthenticateAction
  | CreateGameAction
  | CreateGameSuccessAction
  | CreateGameFailAction
  | JoinGameAction
  | JoinGameSuccessAction
  | JoinGameFailAction
  | ProfileInfoAction
  | ProfileInfoSuccessAction
  | ProfileInfoFailAction;

