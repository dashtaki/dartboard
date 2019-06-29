import * as userActions from '../actions/user.action';

export interface State {
  isLoggedIn: boolean;
  name: string;
  email: string;
  error: any;
  isFetching: boolean;
}

const initialState: State = {
  isLoggedIn: false,
  name: '',
  email: '',
  error: '',
  isFetching: true
};


export function reducer(state = initialState, action: userActions.Actions): State {
  switch (action.type) {

    case userActions.LOGIN: {
      return {
        ...state
      }
    }

    case userActions.LOGIN_SUCCESS: {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        isLoggedIn: true,
        isFetching: false
      };
    }

    case userActions.LOGIN_FAIL: {
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

export const isLoggedIn = (state: State) => state.isLoggedIn;
export const getUserEmail = (state: State) => state.email;
export const getUserName = (state: State) => state.name;
export const isFetching = (state: State) => state.isFetching;
export const error = (state: State) => state.error;
