import { Component, OnInit } from '@angular/core';
import { arbitratorTabTitles } from './models/arbitrator-tab-titles.model';

@Component({
  selector: 'app-arbitrator',
  templateUrl: './arbitrator.component.html',
  styleUrls: ['./arbitrator.component.scss'],
})
export class ArbitratorComponent implements OnInit {
  enable: boolean = false;
  tabTitles: { id: string; value: string; path: string }[] =
    arbitratorTabTitles;

  constructor() {}

  ngOnInit(): void {
    this.enable = true;
  }
}
