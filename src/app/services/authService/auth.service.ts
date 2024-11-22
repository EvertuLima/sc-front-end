import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthModel } from '../../models/auth.model';
import { resetState } from '../../store/store.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/room/api/token';

  constructor(private http: HttpClient, private store: Store) {}

  login(credentials: AuthModel): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
      })
    );
  }

  // verifyToken(): Observable<{}> {
  //   if (typeof window !== 'undefined') {
  //     const token = localStorage.getItem('access_token');
  //     return this.http.post<{}>(`${this.apiUrl}/verify/`, { token: token });
  //   } else {
  //     return;
  //   }
  // }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      return token;
    } else {
      return null;
    }
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(resetState());
  }
}

interface TokenResponse {
  access: string;
  refresh: string;
}
