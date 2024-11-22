import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUserModel } from '../../models/registerUser';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth.service';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/user/api';
  constructor(private http: HttpClient, private authService: AuthService) {}

  createUser(newUser: RegisterUserModel): Observable<UserCreateResponse> {
    this.authService.logout()
    return this.http.post<UserCreateResponse>(`${this.apiUrl}/`, newUser);
  }

  loadCurrentUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/me/`)
  }
}

interface UserCreateResponse {
  user: RegisterUserModel;
  messega: string;
}
