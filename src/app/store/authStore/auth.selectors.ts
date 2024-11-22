import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectAuthIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
)

export const selectAuthToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token
)