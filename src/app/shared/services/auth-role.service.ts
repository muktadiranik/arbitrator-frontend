import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';
import { DisputeTabsService } from 'src/app/views/pages/dispute/dispute-base/dispute-tabs.service';
import { Actor, User } from '../interfaces/auth';
import { Dispute } from '../interfaces/dispute';
import { Witness } from '../interfaces/witness';
import { AmountUtil } from '../utils/amount';

@Injectable({ providedIn: 'root' })
export class AuthRoleService {
  public HOME_PAGE = ['/']; //home page gets set on every call to user api
  public loggedUser: any;
  witnesses$ = new Subject<Witness[]>();

  constructor(
    private http: HttpClient,
    private route: Router,
    private disputeTabs: DisputeTabsService
  ) {}

  getWitnesses(): Observable<Witness[]> {
    return this.witnesses$.asObservable();
  }

  setWitnesses(witnesses: Witness[]): void {
    this.witnesses$.next(witnesses);
  }

  home(user: User) {
    const { type: actorType } = <Actor>user.actor;
    if (user.is_superuser) {
      this.HOME_PAGE = ['admin', 'dispute'];
    } else if (['claimer', 'respondent', 'witness'].includes(actorType)) {
      if (user.disputes && user.disputes.length == 1) {
        this.HOME_PAGE = [
          'dispute',
          user.disputes[0].toString(),
          ...this.disputeTabs
            .getTab(this.getActorDisputeHome(actorType))
            .path.split('/'),
        ];
      } else {
        this.HOME_PAGE = [actorType, 'details'];
      }
    } else if (actorType == 'creator') {
      this.HOME_PAGE = ['dispute', 'status', 'waiting-for-sign-up'];
    } else if (actorType == 'arbitrator') {
      this.HOME_PAGE = ['arbitrator', 'dashboard'];
    }
  }

  getActorDisputeHome(actorType: string) {
    if (actorType == 'witness') {
      return 'witnessme';
    } else if (
      ['claimer', 'respondent', 'arbitrator', 'creator'].includes(actorType)
    ) {
      return 'dashboard';
    } else {
      return '';
    }
  }

  public user() {
    return this.http
      .get<User>('/auth/user/')
      .pipe(tap((user: User) => this.doLoginUser(user)));
  }

  doLoginUser(user: any): void {
    this.loggedUser = user;
    this.home(user);
  }

  doLogoutUser(): void {
    this.loggedUser = undefined;
    this.route.navigate(['/auth/login']);
  }

  getCurrentUser(): any {
    if (this.loggedUser) {
      return of(this.loggedUser);
    } else {
      return this.user().pipe(tap((user) => this.doLoginUser(user)));
    }
  }

  getUserCreator(user: any, dispute: Dispute): string {
    return user.creator == dispute?.claimer?.id ? 'claimer' : 'respondent';
  }

  isLoggedIn$(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map((user) => !!user),
      catchError(() => of(false))
    );
  }
  get isSuperUser() {
    return this.loggedUser?.is_superuser;
  }

  get userType() {
    return this.loggedUser?.actor.type;
  }

  get userEmail() {
    return this.loggedUser?.actor.user.email;
  }

  fullname(user: any) {
    if (!user) return '';
    return `${user.first_name} ${user.last_name}`;
  }

  primaryCity(address: any) {
    return address && address.length && address[0].city;
  }

  get isArbitrator() {
    return this.userType == 'arbitrator';
  }

  get isClaimer() {
    return this.userType == 'claimer';
  }

  get isRespondent() {
    return this.userType == 'respondent';
  }

  //  dispute
  //// we set this dispute in app-table
  dispute$ = new BehaviorSubject(this.dispute);

  set dispute(value: any) {
    this.dispute$.next(value); // this will make sure to tell every subscriber about the change.
  }

  get arbitrator() {
    return this.dispute.arbitrator;
  }

  get claimer() {
    return this.dispute.claimer;
  }

  get respondent() {
    return this.dispute.respondent;
  }

  get arbitratorName() {
    if (!this.arbitrator) return '-';
    return this.fullname(this.arbitrator.user);
  }

  get claimerName() {
    if (!this.claimer) return '';
    return this.fullname(this.claimer.user);
  }

  get respondentName() {
    if (!this.respondent) return '';
    return this.fullname(this.respondent.user);
  }

  amountUtil = AmountUtil;
  get disputeClaimedAmount() {
    return this.amountUtil.appendCurrency(this.dispute.claim, 'claimed_amount');
  }

  checkIfMe(user: User): boolean {
    return user ? user.type == this.userType : true;
  }
}
