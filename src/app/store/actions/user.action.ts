import {Action} from '@ngrx/store';
import {CreateGame} from "../../services/models/create-game.model";

export const LOGIN = '[User] Login';
export const LOGIN_SUCCESS = '[User] Login Success';
export const LOGIN_FAIL = '[User] Login Fail';

export const AUTHENTICATE = '[User] Authenticate';

export const CREATE_GAME = '[User] Create Game';
export const CREATE_GAME_SUCCESS = '[User] Create Game Success';
export const CREATE_GAME_FAIL = '[User] Create Game Fail';

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

export type Actions =
  LoginAction
  | LoginFailAction
  | LoginSuccessAction
  | AuthenticateAction
  | CreateGameAction
  | CreateGameSuccessAction
  | CreateGameFailAction;

