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

export const GET_PROFILE_INFO = '[User] Get Profile Info';
export const GET_PROFILE_INFO_SUCCESS = '[User] Get Profile Info Success';
export const GET_PROFILE_INFO_FAIL = '[User] Get Profile Info Fail';

export const SET_PROFILE_INFO = '[User] Set Profile Info';
export const SET_PROFILE_INFO_SUCCESS = '[User] Set Profile Info Success';
export const SET_PROFILE_INFO_FAIL = '[User] Set Profile Info Fail';

export const LEAVE_GAME = '[User] Leave Game';
export const LEAVE_GAME_SUCCESS = '[User] Leave Game Success';
export const LEAVE_GAME_FAIL = '[User] Leave Game Fail';

export const INVITE_GAME = '[User] Invite Game';
export const INVITE_GAME_SUCCESS = '[User] Invite Game Success';
export const INVITE_GAME_FAIL = '[User] Invite Game Fail';

export const KICK_GAME = '[User] Kick Game';
export const KICK_GAME_SUCCESS = '[User] Kick Game Success';
export const KICK_GAME_FAIL = '[User] Kick Game Fail';

export const ADD_GAME_SCORE = '[User] Add Game Score';
export const ADD_GAME_SCORE_SUCCESS = '[User] Add Game Score Success';
export const ADD_GAME_SCORE_FAIL = '[User] Add Game Score Fail';

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

export class GetProfileInfoAction implements Action {
  readonly type = GET_PROFILE_INFO;
}

export class GetProfileInfoSuccessAction implements Action {
  readonly type = GET_PROFILE_INFO_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetProfileInfoFailAction implements Action {
  readonly type = GET_PROFILE_INFO_FAIL;

  constructor(public payload: any) {
  }
}

export class SetProfileInfoAction implements Action {
  readonly type = SET_PROFILE_INFO;

  constructor(public payload: any) {
  }
}

export class SetProfileInfoSuccessAction implements Action {
  readonly type = SET_PROFILE_INFO_SUCCESS;

  constructor(public payload: any) {
  }
}

export class SetProfileInfoFailAction implements Action {
  readonly type = SET_PROFILE_INFO_FAIL;

  constructor(public payload: any) {
  }
}

export class LeaveGameAction implements Action {
  readonly type = LEAVE_GAME;

  constructor(public payload: any) {
  }
}

export class LeaveGameSuccessAction implements Action {
  readonly type = LEAVE_GAME_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LeaveGameFailAction implements Action {
  readonly type = LEAVE_GAME_FAIL;

  constructor(public payload: any) {
  }
}

export class InviteGameAction implements Action {
  readonly type = INVITE_GAME;

  constructor(public payload: any) {
  }
}

export class InviteGameSuccessAction implements Action {
  readonly type = INVITE_GAME_SUCCESS;

  constructor(public payload: any) {
  }
}

export class InviteGameFailAction implements Action {
  readonly type = INVITE_GAME_FAIL;

  constructor(public payload: any) {
  }
}

export class KickGameAction implements Action {
  readonly type = KICK_GAME;

  constructor(public payload: any) {
  }
}

export class KickGameSuccessAction implements Action {
  readonly type = KICK_GAME_SUCCESS;

  constructor(public payload: any) {
  }
}

export class KickGameFailAction implements Action {
  readonly type = KICK_GAME_FAIL;

  constructor(public payload: any) {
  }
}

export class AddGameScoreAction implements Action {
  readonly type = ADD_GAME_SCORE;

  constructor(public payload: any) {
  }
}

export class AddGameScoreSuccessAction implements Action {
  readonly type = ADD_GAME_SCORE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddGameScoreFailAction implements Action {
  readonly type = ADD_GAME_SCORE_FAIL;

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
  | GetProfileInfoAction
  | GetProfileInfoSuccessAction
  | GetProfileInfoFailAction
  | SetProfileInfoAction
  | SetProfileInfoSuccessAction
  | SetProfileInfoFailAction
  | LeaveGameAction
  | LeaveGameSuccessAction
  | LeaveGameFailAction
  | InviteGameAction
  | InviteGameSuccessAction
  | InviteGameFailAction
  | KickGameAction
  | KickGameSuccessAction
  | KickGameFailAction
  | AddGameScoreAction
  | AddGameScoreSuccessAction
  | AddGameScoreFailAction;

