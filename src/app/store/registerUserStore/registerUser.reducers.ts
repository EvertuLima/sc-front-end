import { createReducer, on } from '@ngrx/store';

import { RegisterUserModel } from '../../models/registerUser';
import {
  registerUser,
  registerUserFailure,
  registerUserSuccess,
} from './registerUser.actions';

export interface RegisterUserState {
  user: RegisterUserModel;
  error: string | null;
}

export const initialState: RegisterUserState = {
  user: {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  },
  error: null,
};

export const registerUserReducer = createReducer(
  initialState,
  on(registerUser, (state, { user }) => ({
    ...state,
    user: user,
    error: null,
  })),
  on(registerUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    error: null,
  })),
  on(registerUserFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
);
