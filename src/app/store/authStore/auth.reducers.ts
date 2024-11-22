import { ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AuthState {
  token: string | null;
  error: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const initialState: AuthState = {
  token: null,
  error: null,
  isAuthenticated: false,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  }))
);

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    const isBrowser =
      typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    const syncedReducer = isBrowser
      ? localStorageSync({
          keys: ['token', 'isAuthenticated', 'loading', 'error'],
          rehydrate: true,
        })(reducer)
      : reducer;
    return syncedReducer(state, action);
  };
}

export const metaAuthReducers: MetaReducer[] = [localStorageSyncReducer];
