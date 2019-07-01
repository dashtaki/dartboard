import * as userActions from '../actions/user.action';
import {User} from '../../services/models/user.model';

export interface State {
  isLoggedIn: boolean;
  loginData: any;
  me: User;
  name: string;
  email: string;
  error: any;
  joined: boolean;
  invited: boolean;
  kicked: boolean;
  leaved: boolean;
  isGameCreated: boolean;
  isFetching: boolean;
}

const initialState: State = {
  isLoggedIn: false,
  me: null,
  loginData: null,
  name: '',
  email: '',
  error: '',
  joined: false,
  kicked: false,
  invited: false,
  isGameCreated: false,
  leaved: false,
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
    case userActions.UPDATE_GAME:
    case userActions.JOIN_GAME:
    case userActions.CREATE_GAME: {
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

    case userActions.JOIN_GAME_SUCCESS: {
      return {
        ...state,
        joined: true,
        isFetching: false
      }
    }

    case userActions.INVITE_GAME_SUCCESS: {
      return {
        ...state,
        invited: true,
        isFetching: false
      }
    }

    case userActions.LEAVE_GAME_SUCCESS: {
      return {
        ...state,
        leaved: true,
        isFetching: false
      }
    }

    case userActions.KICK_GAME_SUCCESS: {
      return {
        ...state,
        kicked: true,
        isFetching: false
      }
    }

    case userActions.CREATE_GAME_SUCCESS: {
      return {
        ...state,
        isGameCreated: true,
        isFetching: false
      }
    }

    case userActions.AUTHENTICATE: {
      return {
        ...state,
        isLoggedIn: action.payload
      };
    }

    case userActions.UPDATE_USER_NAME: {
      return {
        ...state,
        name: action.payload
      };
    }

    case userActions.LOGIN_FAIL:
    case userActions.GET_PROFILE_INFO_FAIL:
    case userActions.SET_PROFILE_INFO_FAIL:
    case userActions.LEAVE_GAME_FAIL:
    case userActions.INVITE_GAME_FAIL:
    case userActions.KICK_GAME_FAIL:
    case userActions.ADD_GAME_SCORE_FAIL:
    case userActions.UPDATE_GAME_FAIL:
    case userActions.JOIN_GAME_FAIL:
    case userActions.CREATE_GAME_FAIL: {
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
export const joined = (state: State) => state.joined;
export const invited = (state: State) => state.invited;
export const leaved = (state: State) => state.leaved;
export const kicked = (state: State) => state.kicked;
export const isGameCreated = (state: State) => state.isGameCreated;
export const getError = (state: State) => state.error;
