import { WitnessService } from 'src/app/shared/services/witness.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/shared/interfaces/auth';
import { Dispute } from 'src/app/shared/interfaces/dispute';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { ActorUtil } from 'src/app/shared/utils/actor';
import { AmountUtil } from 'src/app/shared/utils/amount';
import { AuthRoleService } from '../../../../../shared/services/auth-role.service';
import { Witness } from 'src/app/shared/interfaces/witness';
import { DateUtil } from 'src/app/shared/utils/date';

@Component({
  selector: 'dispute-table',
  templateUrl: './dispute-table.component.html',
  styleUrls: ['./dispute-table.component.scss'],
})
export class DisputeTableComponent implements OnInit {
  table: string = '';
  scrollValue = '310px';
  allowedActions: any[] = [];
  witnessLoading: boolean = false;
  disputeWitnesses: Witness[] = [];
  actorUtil = ActorUtil;
  amountUtil = AmountUtil;

  @Input('tableName') set tableName(val: any) {
    this.table = val;
    if (val !== 'claimer-respondent') {
      this.scrollValue = '450px';
    }
  }
  @Input() tableData: any[] = [];
  @Input() showEllipsis: boolean = false;
  @Input() actions: any[] = [];
  @Input() actor!: Actor;
  @Input() loading: boolean = false;
  @Input() tableForSuperAdmin: string = '';
  @Output() onAction = new EventEmitter<any>();

  dateUtil = DateUtil;

  constructor(
    private router: Router,
    public authRoleService: AuthRoleService,
    public disputeService: DisputeService,
    private witnessService: WitnessService
  ) {}

  ngOnInit(): void {}

  registerRespondent(dispute: Dispute) {
    this.router.navigate([`/dispute/${dispute.id}/respondent/new`]);
  }

  actionTrigger(action: any) {
    this.onAction.emit(action);
    // this.tableData = this.tableData.filter(
    //   (dispute: Dispute) => dispute.id !== action.dispute.id
    // );
  }

  getWitnesses(isExpanded: boolean, dispute: any): void {
    if (isExpanded && dispute.claim) {
      this.witnessLoading = true;
      this.witnessService.getDisputeWitnesses(dispute.claim.id).subscribe({
        next: (disputeWitnesses: any) => {
          if (disputeWitnesses.length > 0)
            this.disputeWitnesses[dispute.id] = disputeWitnesses;
        },
        complete: () => {
          this.witnessLoading = false;
        },
      });
    }
  }
}
