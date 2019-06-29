import * as userActions from '../actions/user.action';
import {User} from '../../services/models/user.model';

export interface State {
  isLoggedIn: boolean;
  loginData: any,
  me: User,
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
    case userActions.PROFILE_INFO: {
      return {
        ...state
      }
    }

    case userActions.LOGIN_SUCCESS: {
      return {
        ...state,
        loginData: action.payload,
        isLoggedIn: true,
        isFetching: false
      };
    }

    case userActions.PROFILE_INFO_SUCCESS: {
      return {
        ...state,
        me: action.payload
      }
    }

    case userActions.AUTHENTICATE: {
      return {
        ...state,
        isLoggedIn: action.payload
      }
    }

    case userActions.LOGIN_FAIL:
    case userActions.PROFILE_INFO_FAIL: {
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

export const getLoginData = (state: State) => state.loginData;
export const isLoggedIn = (state: State) => state.isLoggedIn;
export const getUserProfileInfo = (state: State) => state.me;
export const getUserEmail = (state: State) => state.email;
export const getUserName = (state: State) => state.name;
export const isFetching = (state: State) => state.isFetching;
export const error = (state: State) => state.error;
