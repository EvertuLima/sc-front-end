import { createReducer, on } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { UserModel } from '../../models/user.model';
import {
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
} from './user.actions';

export interface UserState {
  user: UserModel | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  error: null,
  loading: true,
};

export const userReducer = createReducer(
  initialState,
  on(loadCurrentUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    error: null,
    loading: false,
  })),
  on(loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: true,
  }))
);

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    // Verifique se o localStorage está disponível
    const isBrowser =
      typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    const syncedReducer = isBrowser
      ? localStorageSync({ keys: ['user'], rehydrate: true })(reducer)
      : reducer;
    return syncedReducer(state, action);
  };
}

export const metaUserReducers: MetaReducer[] = [localStorageSyncReducer];
