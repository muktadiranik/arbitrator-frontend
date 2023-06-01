import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { TimeLogService } from '../../services/time-log.service';

@Component({
  selector: 'app-add-edit-timelog',
  templateUrl: './add-edit-timelog.component.html',
  styleUrls: ['./add-edit-timelog.component.scss'],
})
export class AddEditTimelogComponent implements OnInit {
  @Input() inputData: any;
  @Input() type!: string;
  @Input() participantId: any;

  date = new Date();
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);

  timeLogForm!: FormGroup;

  get timeLogFormControls() {
    return this.timeLogForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private authRoleService: AuthRoleService,
    private timelogSer: TimeLogService
  ) {}

  ngOnInit(): void {
    this.timeLogForm = this.fb.group({
      date: new FormControl(
        this.inputData?.date ? new Date(this.inputData.date) : this.date,
        Validators.required
      ),
      start_time: new FormControl(
        this.inputData?.start_time
          ? new Date(`${this.inputData.date} ${this.inputData.start_time}`)
          : new Date(),
        Validators.required
      ),
      end_time: new FormControl(
        this.inputData?.end_time
          ? new Date(`${this.inputData.date} ${this.inputData.end_time}`)
          : new Date(),
        Validators.required
      ),
      note: new FormControl(this.inputData?.note ?? ''),
    });
  }

  createRequestBody() {
    let requestBody: any = {};

    for (const key in this.timeLogFormControls) {
      if (this.timeLogFormControls[key].dirty) {
        if (key == 'date') {
          let val = this.timeLogFormControls[key].value;
          requestBody[key] = `${val.getFullYear()}-${
            val.getMonth() + 1
          }-${val.getDate()}`;
        } else if (key != 'note') {
          let val = this.timeLogFormControls[key].value;
          requestBody[
            key
          ] = `${val.getHours()}:${val.getMinutes()}:${val.getSeconds()}`;
        } else {
          requestBody[key] = this.timeLogFormControls[key].value;
        }
      }
    }

    return requestBody;
  }

  submit() {
    if (this.inputData) {
      //edit mode
      let requestBody = this.createRequestBody();

      this.timelogSer
        .updateTimeLogEntry(requestBody, this.inputData.id)
        .subscribe((res: any) => {
          this.modal.close({ type: 'update', data: res });
        });
    } else {
      //create mode
      let dateVal = this.timeLogFormControls['date'].value;
      let startTimeVal = this.timeLogFormControls['start_time'].value;
      let endTimeVal = this.timeLogFormControls['end_time'].value;

      let requestBody: any = {
        note: this.timeLogFormControls['note'].value,

        date: `${dateVal.getFullYear()}-${
          dateVal.getMonth() + 1
        }-${dateVal.getDate()}`,

        start_time: `${startTimeVal.getHours()}:${startTimeVal.getMinutes()}:${startTimeVal.getSeconds()}`,
        end_time: `${endTimeVal.getHours()}:${endTimeVal.getMinutes()}:${endTimeVal.getSeconds()}`,
        type: this.type,
        dispute: localStorage.getItem('disputeId'),
        creator: this.authRoleService.loggedUser.actor.id,
      };

      if (this.type == 'C') {
        requestBody['participant'] = this.participantId;
      }

      this.timelogSer.addTimeLogEntry(requestBody).subscribe((res: any) => {
        this.modal.close(res);
      });
    }
  }

  cancel() {
    this.modal.close();
  }
}
