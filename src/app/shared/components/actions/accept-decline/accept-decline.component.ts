import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/shared/interfaces/auth';
import { Dispute } from 'src/app/shared/interfaces/dispute';

@Component({
  selector: 'dispute-accept-decline',
  templateUrl: './accept-decline.component.html',
  styleUrls: ['./accept-decline.component.scss'],
})
export class AcceptDeclineComponent implements OnInit {
  constructor() {}
  @Input() dispute!: Dispute;
  @Input() actor!: Actor;
  @Input() actions: any = [];
  @Output() onAction = new EventEmitter<any>();
  ngOnInit(): void {}

  actionTrigger(action: any) {
    this.onAction.emit(action);
  }
}
