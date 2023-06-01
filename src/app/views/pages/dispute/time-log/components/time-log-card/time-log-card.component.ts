import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddEditTimelogComponent } from '../add-edit-timelog/add-edit-timelog.component';
import { ViewEditTimelogComponent } from '../view-edit-timelog/view-edit-timelog.component';
import { DateUtil } from 'src/app/shared/utils/date';

@Component({
  selector: 'time-log-card',
  templateUrl: './time-log-card.component.html',
  styleUrls: ['./time-log-card.component.scss'],
})
export class TimeLogCardComponent implements OnInit {
  @Input() tableData!: any[];
  @Input() show: boolean = false;

  dateUtil = DateUtil;

  constructor(private modalService: NzModalService) {}

  ngOnInit(): void {}

  editEntries() {
    const modal = this.modalService.create({
      nzContent: ViewEditTimelogComponent,
      nzFooter: null,
      nzWidth: 900,

      nzComponentParams: {
        tableData: this.tableData,
        showCreatedBy: true,
      },
    });

    modal.afterClose.subscribe((res) => {
      console.log(res);
      if (res && res.type == 'delete') {
        this.tableData.splice(res.index);
      }
    });
  }

  addManualEntry() {
    const modal = this.modalService.create({
      nzContent: AddEditTimelogComponent,
      nzTitle: 'Add Timelog',
      nzWidth: 600,
      nzFooter: null,
    });

    modal.afterClose.subscribe((res) => {
      console.log(res);
    });
  }
}
