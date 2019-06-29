import {Action} from '@ngrx/store';

export const ALL_GAMES = '[Guest] All Games';
export const ALL_GAMES_SUCCESS = '[Guest] All Games Success';
export const ALL_GAMES_FAIL = '[Guest] All Games Fail';

export const GAME = '[Guest] Game';
export const GAME_SUCCESS = '[Guest] Game Success';
export const GAME_FAIL = '[Guest] Game Fail';

export const ALL_USERS = '[Guest] All Users';
export const ALL_USERS_SUCCESS = '[Guest] All Users Success';
export const ALL_USERS_FAIL = '[Guest] All Users Fail';


export class AllGamesAction implements Action {
  readonly type = ALL_GAMES;

  constructor(public payload: number) {
  }
}

export class AllGamesSuccessAction implements Action {
  readonly type = ALL_GAMES_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AllGamesFailAction implements Action {
  readonly type = ALL_GAMES_FAIL;

  constructor(public payload: any) {
  }
}

export class GameAction implements Action {
  readonly type = GAME;

  constructor(public payload: number) {
  }
}

export class GameSuccessAction implements Action {
  readonly type = GAME_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GameFailAction implements Action {
  readonly type = GAME_FAIL;

  constructor(public payload: any) {
  }
}

export class AllUsersAction implements Action {
  readonly type = ALL_USERS;

  constructor(public payload?: number) {
  }
}

export class AllUsersSuccessAction implements Action {
  readonly type = ALL_USERS_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AllUsersFailAction implements Action {
  readonly type = ALL_USERS_FAIL;

  constructor(public payload: any) {
  }
}

export type Actions =
  AllGamesAction
  | AllGamesSuccessAction
  | AllGamesFailAction
  | GameAction
  | GameSuccessAction
  | GameFailAction
  | AllUsersAction
  | AllUsersSuccessAction
  | AllUsersFailAction;
