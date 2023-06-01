import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ClaimerRespondentService } from 'src/app/views/pages/claimer-respondent/shared/claimer-respondent.service';
import { TimeLogService } from '../../services/time-log.service';
import { AddEditTimelogComponent } from '../add-edit-timelog/add-edit-timelog.component';
import { ViewEditTimelogComponent } from '../view-edit-timelog/view-edit-timelog.component';
import { DateUtil } from 'src/app/shared/utils/date';

@Component({
  selector: 'caucus-table-data',
  templateUrl: './caucus-table-data.component.html',
  styleUrls: ['./caucus-table-data.component.scss'],
})
export class CaucusTableDataComponent implements OnInit {
  @Input() dispute!: any;
  dateUtil = DateUtil;
  tableData!: any[];
  cardIsLoading = false;
  participantIsLoading = false;
  caucusParticipantsList!: any[];
  caucusParticipants: number[] = [];

  totalHours: number[] = [];
  totalMinutes: number[] = [];

  constructor(
    private timelogSer: TimeLogService,
    private modalService: NzModalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cardIsLoading = true;

    this.timelogSer.getCaucusTableData(this.dispute.id).subscribe({
      next: (res: any) => {
        this.cardIsLoading = false;
        this.tableData = res;

        this.caucusParticipants = [];
        this.tableData.forEach((data: any) => {
          this.caucusParticipants.push(data.participant);
        });

        if (this.caucusParticipants.length) {
          this.caucusParticipants = [...new Set(this.caucusParticipants)];

          let claimerId = Number(this.dispute.claimer.id);
          let respondentId = Number(this.dispute.respondent.id);
          let tempData: any[] = [];
          this.caucusParticipantsList = [];

          this.caucusParticipants.forEach((participant: any, ind: number) => {
            tempData.push(
              this.tableData.filter(
                (data: any) => data.participant == participant
              )
            );
            if (participant == claimerId) {
              this.caucusParticipantsList.push(this.dispute.claimer.id);
            } else if (participant == respondentId) {
              this.caucusParticipantsList.push(this.dispute.respondent.id);
            }
          });

          this.tableData = tempData;
          this.calculateTime();
        } else {
          this.caucusParticipants = [-1];
          this.tableData = [[]];
          this.caucusParticipantsList = [''];
        }
      },
      error: () => {
        this.cardIsLoading = false;
      },
    });
  }

  transformDuration(duration: string): string {
    return duration
      ? `${duration.split(':')[0]}h:${duration.split(':')[1]}m`
      : '';
  }

  calculateTime() {
    this.tableData.forEach((data: any, ind: number) => {
      this.totalHours[ind] = 0;
      this.totalMinutes[ind] = 0;
      data.forEach((d: any) => {
        if (d.duration) {
          this.totalHours[ind] += Number(d.duration.split(':')[0]);
          this.totalMinutes[ind] += Number(d.duration.split(':')[1]);

          if (this.totalMinutes[ind] >= 60) {
            this.totalMinutes[ind] = this.totalMinutes[ind] - 60;
            this.totalHours[ind] += 1;
          }
        }
      });
    });
  }

  editEntries(ind: number) {
    const modal = this.modalService.create({
      nzContent: ViewEditTimelogComponent,
      nzFooter: null,
      nzWidth: 900,

      nzOnCancel: (res) => {
        this.tableData[ind] = [];
        this.tableData[ind] = res.tableData;
        this.calculateTime();
      },

      nzComponentParams: {
        tableData: this.tableData[ind],
        showCreatedBy: false,
      },
    });

    modal.afterClose.subscribe((res: any) => {
      console.log(res);
    });
  }

  addManualEntry(ind: number) {
    const modal = this.modalService.create({
      nzContent: AddEditTimelogComponent,
      nzTitle: 'Add Timelog',
      nzWidth: 600,
      nzFooter: null,

      nzComponentParams: {
        type: 'C',
        participantId: this.caucusParticipants[ind],
      },
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
        this.timelogSer.getTimeLogEntry(res.id).subscribe((res: any) => {
          this.notificationService.success('Time Log Entry Created.');

          this.tableData[ind].unshift(res);
          let tempData = JSON.parse(JSON.stringify(this.tableData[ind]));
          this.tableData[ind] = [];
          this.tableData[ind] = tempData;
          this.calculateTime();
        });
      }
    });
  }
}
