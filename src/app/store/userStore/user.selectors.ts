import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducers";

export const selectsUserState = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
    selectsUserState,
    (state: UserState) => state.user!
);

export const selectCurrentUserLoading = createSelector(
    selectsUserState,
    (state: UserState) => state.loading
)