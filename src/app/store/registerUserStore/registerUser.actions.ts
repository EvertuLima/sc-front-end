import { createAction, props } from '@ngrx/store';
import { RegisterUserModel } from '../../models/registerUser';

export const registerUser = createAction(
  '[RegisterUser] User Register',
  props<{ user: RegisterUserModel }>()
);

export const registerUserSuccess = createAction(
  '[RegisterUser] User Register Success',
  props<{ user: RegisterUserModel }>()
);

export const registerUserFailure = createAction(
  '[RegisterUser] User Register Failure',
  props<{ error: string }>()
);
