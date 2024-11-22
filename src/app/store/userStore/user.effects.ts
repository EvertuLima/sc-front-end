import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/userService/user.service';
import {
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
} from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { loginSuccess } from '../authStore/auth.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}


  loadUserAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(() => loadCurrentUser())
    )
  );

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUser),
      switchMap(() =>
        this.userService.loadCurrentUser().pipe(
          map((user) => loadCurrentUserSuccess({ user: user })),
          catchError((error) => of(loadCurrentUserFailure({ error: error })))
        )
      )
    )
  );
}
