import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { selectCurrentUser } from '../store/userStore/user.selectors';
import { AuthService } from '../services/authService/auth.service';
import { loadCurrentUser } from '../store/userStore/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectCurrentUser).pipe(
      take(1),
      map((user) => {
        const hasToken = this.authService.getToken(); // Método para pegar o token do localStorage

        if (user && hasToken) {
          return true;
        }

        if (hasToken && !user) {
          this.store.dispatch(loadCurrentUser());
          return true;
        }

        setTimeout(() => {
          this.router.navigate(['']);
        }, 500);
        return false;
      })
    );
  }
}
