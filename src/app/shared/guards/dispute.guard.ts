import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DisputeTabsService } from 'src/app/views/pages/dispute/dispute-base/dispute-tabs.service';
import { AuthRoleService } from '../services/auth-role.service';

@Injectable({
  providedIn: 'root',
})
export class DisputeGuard implements CanActivate {
  constructor(
    private authRoleService: AuthRoleService,
    private disputeTabs: DisputeTabsService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authRoleService
      .getCurrentUser()
      .subscribe((loggedUser: any) => {
        if (state.url.includes('respondent/new')) return true;
        let tabs = this.disputeTabs.setUserTabs(loggedUser);
        if (
          tabs &&
          this.disputeTabs.getTab(route.firstChild?.data['id'], tabs)
        ) {
          return true;
        } else {
          //when in dispute always route to dispute home page
          this.router.navigate([
            'dispute',
            route.params['id'],
            ...this.disputeTabs
              .getTab(
                this.authRoleService.getActorDisputeHome(loggedUser.actor.type)
              )
              .path.split('/'),
            // ...tabs[0].path.split('/'),
          ]);
          return false;
        }
      });
  }
}
