import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbitrator-note-lanes',
  templateUrl: './arbitrator-note-lanes.component.html',
  styleUrls: ['./arbitrator-note-lanes.component.scss'],
})
export class ArbitratorNoteLanesComponent {
  @Input() laneTypes: any = [];
}
