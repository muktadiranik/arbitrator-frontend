import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TimeLogService } from '../../services/time-log.service';
import { AddEditTimelogComponent } from '../add-edit-timelog/add-edit-timelog.component';
import { DateUtil } from 'src/app/shared/utils/date';

@Component({
  selector: 'app-view-edit-timelog',
  templateUrl: './view-edit-timelog.component.html',
  styleUrls: ['./view-edit-timelog.component.scss'],
})
export class ViewEditTimelogComponent implements OnInit {
  @Input() tableData!: any[];
  @Input() showCreatedBy = false;
  dateUtil = DateUtil;
  modalCloseData: any[] = [];

  constructor(
    private modal: NzModalRef,
    private timelogSer: TimeLogService,
    private modalService: NzModalService,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  getCreatedBy() {
    return '';
    return this.authRoleService.loggedUser.actor.user.email;
  }

  transformTime(time: string): string {
    return time
      ? `${time.split(':')[0]}h:${time.split(':')[1]}m:${time.split(':')[2]}s`
      : '';
  }

  transformDuration(duration: string): string {
    return duration
      ? `${duration.split(':')[0]}h:${duration.split(':')[1]}m`
      : '';
  }

  editTimeLog(data: any) {
    const modal = this.modalService.create({
      nzContent: AddEditTimelogComponent,
      nzTitle: 'Edit Timelog',
      nzWidth: 600,
      nzFooter: null,

      nzComponentParams: {
        inputData: data,
      },
    });

    modal.afterClose.subscribe((res) => {
      if (res && res.type == 'update') {
        this.modalCloseData.push(res);

        let ind = this.tableData.findIndex(
          (data: any) => data.id == res.data.id
        );

        this.timelogSer.getTimeLogEntry(res.data.id).subscribe((res: any) => {
          this.notificationService.success('Time Log Entry Updated.');
          this.tableData[ind] = res;
          let temp = JSON.parse(JSON.stringify(this.tableData));
          this.tableData = temp;
        });
      }
    });
  }

  deleteTimeLog(data: any) {
    this.timelogSer.deleteTimeLogEntry(data.id).subscribe(() => {
      this.notificationService.success('Time Log Entry Deleted.');
      this.modalCloseData.push({ type: 'delete', data: data });
      this.tableData = this.tableData.filter((d) => d.id != data.id);
    });
  }

  destroyModal(): void {
    this.modal.close(this.modalCloseData);
  }
}
