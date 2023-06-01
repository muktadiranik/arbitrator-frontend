import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import {
  disputeDashboardTabTitles,
  ITab,
} from '../models/dispute-tab-titles.model';
import { User } from 'src/app/shared/interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class DisputeTabsService {
  tabs$ = new BehaviorSubject<ITab[]>([]);

  set tabs(value: ITab[]) {
    this.tabs$.next(value); // this will make sure to tell every subscriber about the change.
  }

  get tabs() {
    return this.tabs$.getValue();
  }

  constructor() {}

  getTab(tabId: ITab['id'], tabs = disputeDashboardTabTitles): ITab {
    return tabs.filter((tab) => tab.id == tabId)[0];
  }

  pushTab(tabId: ITab['id']) {
    if (!this.getTab(tabId, this.tabs)) {
      let newTabs: ITab[] = [...this.tabs];
      newTabs.push(this.getTab(tabId));
      this.tabs$.next(newTabs);
    }
  }

  removeTab(tabId: ITab['id']) {
    const itemsWithoutDeleted = this.tabs.filter(({ id }) => id !== tabId);
    this.tabs$.next(itemsWithoutDeleted);
  }

  setUserTabs(user: User) {
    let tabs = [];
    // if (!hideTabForRoutes.includes(this.router.url.split('/')[3])) {
    for (let tab of disputeDashboardTabTitles) {
      if (tab.roles.includes(<string>user?.actor?.type)) {
        tabs.push(tab);
      }
    }
    this.tabs = tabs;
    // }
    return this.tabs;
  }
}
