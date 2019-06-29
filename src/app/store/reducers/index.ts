import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';


import * as fromUser from './user.reducers';
import * as fromGuest from './guest.reducer';
import {environment} from '../../../environments/environment.prod';


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export interface State {
  user: fromUser.State;
  guest: fromGuest.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  guest: fromGuest.reducer
};

/*  User state selectors  */
export const getUserState = (state: State) => state.user;
export const getLoginData = createSelector(getUserState, fromUser.getLoginData);
export const getUserEmail = createSelector(getUserState, fromUser.getUserEmail);
export const getUserName = createSelector(getUserState, fromUser.getUserName);
export const isFetchingUser = createSelector(getUserState, fromUser.isFetching);
export const isLoggedIn = createSelector(getUserState, fromUser.isLoggedIn);
export const errorUser = createSelector(getUserState, fromUser.error);

/*  User state selectors  */
export const getGuestState = (state: State) => state.guest;
export const getAllGames = createSelector(getGuestState, fromGuest.getAllGames);
export const getGame = createSelector(getGuestState, fromGuest.getGame);
export const isFetchingGuest = createSelector(getGuestState, fromGuest.isFetching);
export const errorGuest = createSelector(getGuestState, fromGuest.error);
