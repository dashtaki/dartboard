import {Action} from '@ngrx/store';

export const ALL_GAMES = '[Guest] All Games';
export const ALL_GAMES_SUCCESS = '[Guest] All Games Success';
export const ALL_GAMES_FAIL = '[Guest] All Games Fail';


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

export type Actions =
  AllGamesAction
  | AllGamesSuccessAction
  | AllGamesFailAction;
