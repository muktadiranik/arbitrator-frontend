import { Component, OnInit } from '@angular/core';

const creatorDashboardTabTitles = [
  {
    id: 'waiting-for-sign-up',
    value: 'Waiting For Sign-up',
    path: 'waiting-for-sign-up',
  },
  {
    id: 'in-progress',
    value: 'In Progress',
    path: 'in-progress',
  },
  {
    id: 'resolved',
    value: 'Resolved',
    path: 'resolved',
  },
  {
    id: 'unresolved',
    value: 'Unresolved',
    path: 'unresolved',
  },
];

@Component({
  selector: 'app-dispute-status',
  templateUrl: './dispute-status.component.html',
  styleUrls: ['./dispute-status.component.scss'],
})
export class DisputeStatusComponent implements OnInit {
  tabTitles = creatorDashboardTabTitles;
  constructor() {}

  ngOnInit(): void {}
}
