import {Action} from '@ngrx/store';

export const LOGIN = '[User] Login';
export const LOGIN_SUCCESS = '[User] Login Success';
export const LOGIN_FAIL = '[User] Login Fail';

export const AUTHENTICATE = '[User] Authenticate';

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

export type Actions =
  LoginAction
  | LoginFailAction
  | LoginSuccessAction
  | AuthenticateAction;
