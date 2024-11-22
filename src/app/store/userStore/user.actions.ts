import { createAction, props } from "@ngrx/store";
import { UserModel } from "../../models/user.model";

export const loadCurrentUser  = createAction('[User] Load Current User',)

export const loadCurrentUserSuccess = createAction(
    '[User] Load Current User Success',
    props<{ user : UserModel }>()
)

export const loadCurrentUserFailure = createAction(
    '[User] Load Current User Failure',
    props<{ error : string }>()
)
