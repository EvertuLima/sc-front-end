import { createAction, props } from '@ngrx/store';
import { AuthModel } from '../../models/auth.model';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: AuthModel }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const verifyTokenAccess = createAction(
  '[Auth] Verify Token Access',
  props<{ token: string }>()
);

export const refreshTokenAccess = createAction(
  '[Auth] Refresh Token Access',
  props<{ token: string }>()
);

export const logout = createAction('[Auth] Logout');
