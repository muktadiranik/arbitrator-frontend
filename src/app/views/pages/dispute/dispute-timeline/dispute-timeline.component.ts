import { Component, Input, OnInit } from '@angular/core';
import { TimelineStepsService } from 'src/app/shared/services/timeline-steps.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MMDdYyyyPipe } from 'src/app/shared/pipes/date/mm-dd-yyyy/mm-dd-yyyy.pipe';
import { ddPipe } from 'src/app/shared/pipes/date/dd/dd.pipe';
import { MMMdPipe } from 'src/app/shared/pipes/date/MMM-dd/MMM-dd.pipe';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditDisputeStatusModalComponent } from '../edit-dispute-status-modal/edit-dispute-status-modal.component';

@UntilDestroy()
@Component({
  selector: 'dispute-timeline',
  templateUrl: './dispute-timeline.component.html',
  styleUrls: ['./dispute-timeline.component.scss'],
})
export class DisputeTimelineComponent implements OnInit {
  currentDispute: any = null;
  timelineSteps: any = null;
  currrentStep: number = 0;
  loading = true;
  @Input() set dispute(value: any) {
    this.currentDispute = value;
    this.loading = true;
    this.getTimelineSteps();
  }
  constructor(
    private timelineStepsService: TimelineStepsService,
    public datePipe: MMDdYyyyPipe,
    public dateDayPipe: ddPipe,
    public dateMonthDayPipe: MMMdPipe,
    public authRoleService: AuthRoleService,
    private modalSer: NzModalService
  ) {}

  ngOnInit(): void {}

  openStatusEditModal(): void {
    const modal = this.modalSer.create({
      nzTitle: 'Set Dispute Current Status',
      nzContent: EditDisputeStatusModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzCentered: true,
      nzComponentParams: {
        currentStep: this.timelineSteps[this.currrentStep - 1],
      },
    });

    modal.afterClose.subscribe((res) => {
      if (res) this.getTimelineSteps();
    });
  }

  getTimelineSteps() {
    this.timelineStepsService
      .getTimelineSteps(this.currentDispute.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (timelineSteps: any) => {
          this.timelineSteps = timelineSteps;
          this.currrentStep =
            this.timelineSteps.findIndex((step: any) => step.current_step) + 1; // not sure if its the best place for this
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
