import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/userService/user.service';
import { registerUser, registerUserFailure, registerUserSuccess } from './registerUser.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class RegisterUserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(registerUser),
        mergeMap(({user}) =>
            this.userService.createUser(user).pipe(
                map((response) => registerUserSuccess({user: response.user})),
                catchError((error) => of(registerUserFailure({error: error})))
            )
        )
    )
  );
}
