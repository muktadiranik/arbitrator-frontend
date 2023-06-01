import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DisputeTabsService } from 'src/app/views/pages/dispute/dispute-base/dispute-tabs.service';
import { AuthRoleService } from '../services/auth-role.service';
import { HandoffComponent } from 'src/app/views/pages/claimer-respondent/shared/handoff/handoff.component';

@Injectable({
  providedIn: 'root',
})
export class HandoffDeactivateGuard implements CanDeactivate<unknown> {
  constructor(
    public disputeTabs: DisputeTabsService,
    public authRoleService: AuthRoleService
  ) {}
  canDeactivate(
    component: HandoffComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.disputeTabs.setUserTabs(this.authRoleService.loggedUser);
    const { dispute } = component;
    if (dispute.respondent == null) {
      this.disputeTabs.removeTab('respondent');
      this.disputeTabs.removeTab('respondentme');
      this.disputeTabs.removeTab('respondent-handoff');
    }

    if (dispute.claimer && dispute.claimer.invitation_url == null) {
      this.disputeTabs.removeTab('claimer-handoff');
    }

    if (dispute.respondent && dispute.respondent.invitation_url == null) {
      this.disputeTabs.removeTab('respondent-handoff');
    }
    return true;
  }
}
