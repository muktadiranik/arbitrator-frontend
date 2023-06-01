import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRoleService } from '../services/auth-role.service';

@Injectable({
  providedIn: 'root',
})
export class ArbitratorGuard implements CanActivate {
  constructor(private authRoleService: AuthRoleService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authRoleService.userType == 'arbitrator';
  }
}
