import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthRoleService } from '../services/auth-role.service';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate {
  constructor(
    private authRoleService: AuthRoleService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (state.url == '/auth/agreement') return true;

    return this.authRoleService.isLoggedIn$().pipe(
      tap((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(this.authRoleService.HOME_PAGE);
        }
      }),
      map((isLoggedIn: any) => !isLoggedIn)
    );
  }
}
