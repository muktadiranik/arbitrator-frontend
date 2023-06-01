import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbitrator-notes',
  templateUrl: './arbitrator-notes.component.html',
  styleUrls: ['./arbitrator-notes.component.scss'],
})
export class ArbitratorNotesComponent {
  laneTypes = [
    { label: 'Issues', value: 'issues' },
    { label: 'Proposals', value: 'proposals' },
    { label: 'Facts', value: 'facts' },
    { label: 'Uncategorized', value: 'uncategorized' },
  ];
}
