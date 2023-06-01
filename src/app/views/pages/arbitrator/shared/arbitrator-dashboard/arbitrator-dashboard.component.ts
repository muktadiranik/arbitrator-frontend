import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { Dispute } from 'src/app/shared/interfaces/dispute';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { DisputeService } from 'src/app/shared/services/dispute.service';

@Component({
  selector: 'app-arbitrator-dashboard',
  templateUrl: './arbitrator-dashboard.component.html',
  styleUrls: ['./arbitrator-dashboard.component.scss'],
})
export class ArbitratorDashboardComponent implements OnInit {
  date = new Date();
  mode: NzCalendarMode = 'month';
  assignedDisputes: any[] = [];
  pendingDisputes: any[] = [];
  selectedTabIndex = 0;
  constructor(
    private disputeService: DisputeService,
    public authRoleService: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.disputeService.getDisputes().subscribe((disputes: any) => {
      this.assignedDisputes = disputes;
    });

    this.disputeService
      .getDisputesPendingApprovals()
      .subscribe((disputes: any) => {
        this.pendingDisputes = disputes;
        if (!disputes.length) this.selectedTabIndex = 1; //navigate to other tab
      });
  }

  onAction(action: any) {
    this.pendingDisputes = this.pendingDisputes.filter((dispute: Dispute) => {
      if (dispute.id == action.dispute) {
        if (action.action.value == 'Accept') {
          console.log(action);
          this.assignedDisputes = [...this.assignedDisputes, dispute];
        }
      }
      return dispute.id != action.dispute;
    });
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
