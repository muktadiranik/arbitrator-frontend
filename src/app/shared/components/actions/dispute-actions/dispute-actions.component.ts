import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actor } from 'src/app/shared/interfaces/auth';
import { Dispute } from 'src/app/shared/interfaces/dispute';
import { DisputeActionsService } from 'src/app/shared/services/dispute-actions.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'dispute-actions',
  templateUrl: './dispute-actions.component.html',
  styleUrls: ['./dispute-actions.component.scss'],
})
export class DisputeActionsComponent implements OnInit {
  constructor(public disputeActionService: DisputeActionsService) {}
  loading = false;
  actions: any = [];
  //to be performed actions
  @Input() name!: string; //action name
  @Input() value!: string; //action value
  @Input() dispute!: Dispute; //for now only id of dispute is needed
  @Input() actor!: Actor;
  @Input() disabled: boolean = false;
  @Output() onAction = new EventEmitter<any>();

  ngOnInit(): void {
    this.disputeActionService.actions$
      .pipe(untilDestroyed(this))
      .subscribe((actions: any) => {
        if (actions && actions.length) {
          this.loading = false;
          this.actions = actions; // I am doubtful about this location
        } else {
          this.loading = true;
        }
      });
  }

  actionTrigger(name: string, value: string) {
    this.loading = true;
    //find my action
    const performedAction = this.actions.filter((action: any) => {
      return action.action.name == name && action.value == value;
    })[0];
    this.disputeActionService.loading$.next(true);
    this.disputeActionService
      .sendDisputeActorActions({
        dispute: this.dispute.id,
        actor: this.actor?.id,
        action: [performedAction.id],
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (action) => {
          console.log('action', action);
          //emit
          this.onAction.emit({ ...action, action: performedAction });
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.disputeActionService.loading$.next(false);
        },
      });
  }
}
