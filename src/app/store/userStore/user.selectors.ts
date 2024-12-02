import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducers";
import { UserModel } from "../../models/user.model";

export const selectsUserState = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
    selectsUserState,
    (state: UserState) => state.user!
);

export const selectCurrentUserId = createSelector(
    selectCurrentUser,
    (user: UserModel) => user.id
);

export const selectCurrentUserLoading = createSelector(
    selectsUserState,
    (state: UserState) => state.loading
)