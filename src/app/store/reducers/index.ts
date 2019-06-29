import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';


import * as fromUser from './user.reducers';
import {environment} from '../../../environments/environment.prod';


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export interface State {
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
};

/*  User state selectors  */
export const getUserState = (state: State) => state.user;
export const getLoginData = createSelector(getUserState, fromUser.getLoginData);
export const getUserEmail = createSelector(getUserState, fromUser.getUserEmail);
export const getUserName = createSelector(getUserState, fromUser.getUserName);
export const isFetching = createSelector(getUserState, fromUser.isFetching);
export const isLoggedIn = createSelector(getUserState, fromUser.isLoggedIn);
export const error = createSelector(getUserState, fromUser.error);
