// https://code-maze.com/cookie-authentication-aspnetcore-angular/
//for authentication mechanism

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthRoleService } from '../services/auth-role.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authRoleService: AuthRoleService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authRoleService.isLoggedIn$().pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }
}
