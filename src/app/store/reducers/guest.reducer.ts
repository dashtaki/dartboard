import * as guestActions from '../actions/guest.action';
import {AllGames} from '../../services/models/all-games.model';
import {Game} from '../../services/models/game';

export interface State {
  allGames: AllGames,
  game: Game,
  error: any;
  isFetching: boolean;
}

const initialState: State = {
  allGames: null,
  game: null,
  error: '',
  isFetching: true
};


export function reducer(state = initialState, action: guestActions.Actions): State {
  switch (action.type) {

    case guestActions.ALL_GAMES:
    case guestActions.GAME: {
      return {
        ...state
      }
    }

    case guestActions.ALL_GAMES_SUCCESS: {
      return {
        ...state,
        allGames: action.payload,
        isFetching: false
      };
    }

    case guestActions.GAME_SUCCESS: {
      return {
        ...state,
        game: action.payload,
        isFetching: false
      }
    }

    case guestActions.ALL_GAMES_FAIL:
    case guestActions.GAME_FAIL: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
      }
    }

    default: {
      return state;
    }

  }
}

export const getAllGames = (state: State) => state.allGames;
export const getGame = (state: State) => state.game;
export const isFetching = (state: State) => state.isFetching;
export const error = (state: State) => state.error;
