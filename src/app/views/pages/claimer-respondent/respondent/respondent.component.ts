import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { ClaimerRespondentService } from '../shared/claimer-respondent.service';
import { respondentTabTitle } from './models/respondent-tab-titles.model';

@Component({
  selector: 'app-respondent',
  templateUrl: './respondent.component.html',
  styleUrls: ['./respondent.component.scss'],
})
export class RespondentComponent implements OnInit {
  enable: boolean = false;
  tabTitles: { id: string; value: string; path: string }[] = respondentTabTitle;

  constructor(
    private router: Router,
    private appSer: AppService,
    private claimerRespondentSer: ClaimerRespondentService
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('respondent/details')) {
      this.enable = true;
    }

    if (this.router.url.includes('/respondent/registration')) {
      this.enable = false;
      this.appSer.setEnableSearch(false);
    }

    this.claimerRespondentSer.getAlert().subscribe((res: boolean) => {
      if (typeof res == 'boolean') this.enable = res;
    });
  }
}
