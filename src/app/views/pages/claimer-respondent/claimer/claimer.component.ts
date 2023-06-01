import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { ClaimerRespondentService } from '../shared/claimer-respondent.service';
import { claimerTabTitles } from './models/claimer-tab-titles.model';

@Component({
  selector: 'app-claimer',
  templateUrl: './claimer.component.html',
  styleUrls: ['./claimer.component.scss'],
})
export class ClaimerComponent implements OnInit {
  enable: boolean = false;
  tabTitles: { id: string; value: string; path: string }[] = claimerTabTitles;

  constructor(
    private router: Router,
    private appSer: AppService,
    private claimerRespondentSer: ClaimerRespondentService
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('claimer/details')) {
      this.enable = true;
    }

    if (this.router.url.includes('/claimer/registration')) {
      this.enable = false;
      this.appSer.setEnableSearch(false);
    }

    this.claimerRespondentSer.getAlert().subscribe((res: boolean) => {
      if (typeof res == 'boolean') this.enable = res;
    });
  }
}
