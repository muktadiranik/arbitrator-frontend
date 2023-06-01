// https://code-maze.com/cookie-authentication-aspnetcore-angular/
//for authentication mechanism

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthRoleService } from './auth-role.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private authRoleService: AuthRoleService
  ) {}

  public logIn(requestBody: any) {
    return this.http.post(`/auth/login/`, requestBody);
  }

  public signOut() {
    localStorage.clear();
    return this.http
      .post('/auth/logout/', null)
      .pipe(tap(() => this.authRoleService.doLogoutUser()));
  }

  public signUp(requestBody: any) {
    return this.http.post(`/registration/`, requestBody);
  }

  editUser(body: any) {
    return this.http.patch('/auth/user/', body);
  }

  changePassword(body: any) {
    return this.http.post('/auth/password/change/', body);
  }

  resetPassword(body: any) {
    return this.http.post('/auth/password/reset/', body);
  }

  resetChangePassword(body: any) {
    return this.http.post('/auth/password/reset/confirm/', body);
  }
}
