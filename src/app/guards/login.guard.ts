import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectCurrentUser } from '../store/userStore/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectCurrentUser).pipe(
      map((user) => {
        if (user) {
          this.router.navigate(['/rooms']);
          return false;
        }
        return true;
      })
    );
  }
}
