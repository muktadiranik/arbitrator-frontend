import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { ArbitratorAssignmentModalComponent } from '../arbitrator-assignment-modal/arbitrator-assignment-modal.component';

@Component({
  selector: 'app-straight-to-hearing',
  templateUrl: './straight-to-hearing.component.html',
  styleUrls: ['./straight-to-hearing.component.scss'],
})
export class StraightToHearingComponent {
  disputes: any[] = [];
  tabs = ['Unassigned', 'Pending', 'Assigned'];
  currentTabIndex: number = 0;
  loading: boolean = false;

  constructor(
    private disputeSer: DisputeService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getDisputes();
  }

  onTabChange(tabIndex: number) {
    this.currentTabIndex = tabIndex;
    this.disputes = [];
    this.getDisputes();
  }

  getDisputes = () => {
    this.loading = true;
    this.disputeSer.getAllDisputes().subscribe((disputes: any) => {
      this.loading = false;
      this.disputes = disputes.filter(
        this.disputeFilter.bind(this, this.tabs[this.currentTabIndex])
      );
      console.log(this.disputes);
    });
  };

  disputeFilter(tab: string, dispute: any) {
    if (tab == 'Unassigned') {
      if (
        dispute.actions?.name == 'Straight to hearing' ||
        (dispute.actions?.name == 'Approve' &&
          dispute.actions?.value == 'Reject')
      )
        return true;
    } else if (tab == 'Pending') {
      if (
        dispute.actions?.name == 'Approve' &&
        dispute.actions?.value == 'Pending'
      )
        return true;
    } else {
      if (
        dispute.actions?.name == 'Approve' &&
        dispute.actions?.value == 'Accept'
      )
        return true;
    }
    return false;
  }

  openStatusEditModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Assign Arbitrator on Disputes',
      nzContent: ArbitratorAssignmentModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzCentered: true,
      nzComponentParams: {
        disputes: this.disputes,
      },
    });

    modal.afterClose.subscribe((isUpdated: boolean) => {
      if (isUpdated) this.getDisputes();
    });
  }
}
