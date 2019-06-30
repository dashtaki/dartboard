import * as userActions from '../actions/user.action';
import {User} from '../../services/models/user.model';

export interface State {
  isLoggedIn: boolean;
  loginData: any;
  me: User;
  name: string;
  email: string;
  error: any;
  isFetching: boolean;
}

const initialState: State = {
  isLoggedIn: false,
  me: null,
  loginData: null,
  name: '',
  email: '',
  error: '',
  isFetching: true
};


export function reducer(state = initialState, action: userActions.Actions): State {
  switch (action.type) {

    case userActions.LOGIN:
    case userActions.GET_PROFILE_INFO:
    case userActions.SET_PROFILE_INFO:
    case userActions.LEAVE_GAME:
    case userActions.INVITE_GAME:
    case userActions.KICK_GAME:
    case userActions.ADD_GAME_SCORE:
    case userActions.UPDATE_GAME: {
      return {
        ...state
      };
    }

    case userActions.LOGIN_SUCCESS: {
      return {
        ...state,
        loginData: action.payload,
        isLoggedIn: true,
        isFetching: false
      };
    }

    case userActions.GET_PROFILE_INFO_SUCCESS: {
      return {
        ...state,
        me: action.payload,
        email: action.payload.email,
        name: action.payload.name,
        isFetching: false
      };
    }

    case userActions.SET_PROFILE_INFO_SUCCESS: {
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
      };
    }

    case userActions.AUTHENTICATE: {
      return {
        ...state,
        isLoggedIn: action.payload
      };
    }

    case userActions.LOGIN_FAIL:
    case userActions.GET_PROFILE_INFO_FAIL:
    case userActions.SET_PROFILE_INFO_FAIL:
    case userActions.LEAVE_GAME_FAIL:
    case userActions.INVITE_GAME_FAIL:
    case userActions.KICK_GAME_FAIL:
    case userActions.ADD_GAME_SCORE_FAIL:
    case userActions.UPDATE_GAME_FAIL: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    }

    default: {
      return state;
    }

  }
}

export const getLoginData = (state: State) => state.loginData;
export const isLoggedIn = (state: State) => state.isLoggedIn;
export const getUserProfileInfo = (state: State) => state.me;
export const getUserEmail = (state: State) => state.email;
export const getUserName = (state: State) => state.name;
export const isFetching = (state: State) => state.isFetching;
export const error = (state: State) => state.error;
