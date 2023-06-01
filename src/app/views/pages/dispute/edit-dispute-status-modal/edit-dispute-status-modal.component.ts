import { differenceInCalendarDays } from 'date-fns';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { YyyyMmDdPipe } from 'src/app/shared/pipes/date/yyyy-mm-dd/yyyy-mm-dd.pipe';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TimelineStepsService } from 'src/app/shared/services/timeline-steps.service';

@Component({
  selector: 'app-edit-dispute-status-modal',
  templateUrl: './edit-dispute-status-modal.component.html',
  styleUrls: ['./edit-dispute-status-modal.component.scss'],
})
export class EditDisputeStatusModalComponent implements OnInit {
  @Input() currentStep!: any;
  end_date!: FormControl;
  dateFormat = 'MM/dd/yyyy';
  loading: boolean = false;

  constructor(
    private timelineStepsService: TimelineStepsService,
    private datePipe: YyyyMmDdPipe,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    let defaultSelectedDate = new Date();
    if (new Date(this.currentStep.deadline_date) > new Date())
      defaultSelectedDate = new Date(this.currentStep.deadline_date);

    this.end_date = new FormControl(defaultSelectedDate, [Validators.required]);
  }

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date()) < 0;

  submit = () => {
    this.loading = true;
    this.timelineStepsService
      .editTimelineSteps(this.currentStep.id, {
        end_date: this.datePipe.transform(this.end_date.value),
      })
      .subscribe({
        next: (response) => {
          this.modal.close(response);
          this.loading = false;
        },
        error: (error) => {},
      });
  };
}
