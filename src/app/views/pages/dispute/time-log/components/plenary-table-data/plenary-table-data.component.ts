import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TimeLogService } from '../../services/time-log.service';
import { AddEditTimelogComponent } from '../add-edit-timelog/add-edit-timelog.component';
import { ViewEditTimelogComponent } from '../view-edit-timelog/view-edit-timelog.component';
import { DateUtil } from 'src/app/shared/utils/date';

@Component({
  selector: 'plenary-table-data',
  templateUrl: './plenary-table-data.component.html',
  styleUrls: ['./plenary-table-data.component.scss'],
})
export class PlenaryTableDataComponent implements OnInit {
  @Input() dispute!: any;
  dateUtil = DateUtil;
  tableData!: any[];
  isLoading = false;

  totalHours = 0;
  totalMinutes = 0;

  constructor(
    private timelogSer: TimeLogService,
    private modalService: NzModalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.timelogSer.getPlenaryTableData(this.dispute.id).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.tableData = res;

        this.calculateTime();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  transformDuration(duration: string): string {
    return duration
      ? `${duration.split(':')[0]}h:${duration.split(':')[1]}m`
      : '';
  }

  calculateTime() {
    this.totalHours = 0;
    this.totalMinutes = 0;
    this.tableData.forEach((data: any) => {
      if (data.duration) {
        this.totalHours += Number(data.duration.split(':')[0]);
        this.totalMinutes += Number(data.duration.split(':')[1]);

        if (this.totalMinutes >= 60) {
          this.totalMinutes = this.totalMinutes - 60;
          this.totalHours += 1;
        }
      }
    });
  }

  editEntries() {
    const modal = this.modalService.create({
      nzContent: ViewEditTimelogComponent,
      nzFooter: null,
      nzWidth: 900,

      nzOnCancel: (res) => {
        console.log(res);
        this.tableData = [];
        this.tableData = res.tableData;
        this.calculateTime();
      },

      nzComponentParams: {
        tableData: this.tableData,
        showCreatedBy: false,
      },
    });

    modal.afterClose.subscribe((res: any) => {
      console.log(res);
    });
  }

  addManualEntry() {
    const modal = this.modalService.create({
      nzContent: AddEditTimelogComponent,
      nzTitle: 'Add Timelog',
      nzWidth: 600,
      nzFooter: null,

      nzComponentParams: {
        type: 'P',
      },
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
        this.timelogSer.getTimeLogEntry(res.id).subscribe((res: any) => {
          this.notificationService.success('Time Log Entry Created.');

          this.tableData.unshift(res);
          let tempData = JSON.parse(JSON.stringify(this.tableData));
          this.tableData = [];
          this.tableData = tempData;
          this.calculateTime();
        });
      }
    });
  }
}
