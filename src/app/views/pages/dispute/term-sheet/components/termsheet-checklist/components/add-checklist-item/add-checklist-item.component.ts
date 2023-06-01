import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { differenceInCalendarDays } from 'date-fns';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs';
import { YyyyMmDdPipe } from 'src/app/shared/pipes/date/yyyy-mm-dd/yyyy-mm-dd.pipe';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ArbitratorLibraryService } from 'src/app/views/pages/arbitrator/shared/arbitrator-library/shared/arbitrator-library.service';

@Component({
  selector: 'app-add-checklist-item',
  templateUrl: './add-checklist-item.component.html',
  styleUrls: ['./add-checklist-item.component.scss'],
})
export class AddChecklistItemComponent implements OnInit {
  @Input() checklist!: any;
  @Input() item!: any;
  @Input() checklistType: string = '';

  isButtonLoading: boolean = false;
  checklistItemFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private datePipe: YyyyMmDdPipe,
    private libaryService: ArbitratorLibraryService,
    private notificationService: NotificationService
  ) {
    this.checklistItemFormGroup = this.fb.group({
      text: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
      initials: new FormControl(''),
      due_date: new FormControl(new Date()),
    });
  }

  ngOnInit(): void {
    if (this.item) {
      this.checklistItemFormGroup.patchValue(this.item);
    }
  }

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date()) < 0;

  addChecklistItem(): void {
    let requestBody = {
      checklist: this.checklist.id,
      termsheet_checklist_items: [
        {
          text: this.checklistItemFormGroup.value.text,
          comments: this.checklistItemFormGroup.value.comments,
          initials: this.checklistItemFormGroup.value.initials,
          due_date: this.datePipe.transform(
            this.checklistItemFormGroup.value.due_date
          ),
          sequence: 0,
          checked: false,
        },
      ],
    };

    this.isButtonLoading = true;
    this.libaryService
      .addTermsheetChecklistItem(requestBody)
      .pipe(finalize(() => (this.isButtonLoading = false)))
      .subscribe((checklistItem: any) => {
        this.notificationService.success('Checklist item added.');

        this.modal.close(checklistItem);
      });
  }

  updateChecklistItem(): void {
    let requestBody: any = this.getDirtyValues(this.checklistItemFormGroup);

    if ('due_date' in requestBody) {
      requestBody['due_date'] = this.datePipe.transform(
        requestBody['due_date']
      );
    }

    this.isButtonLoading = true;
    this.libaryService
      .updateChecklistItem(this.item.id, this.checklistType, requestBody)
      .pipe(
        finalize(() => {
          this.isButtonLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.notificationService.success('Checklist updated.');
          this.modal.close(res);
        },
        error: () => this.notificationService.error('Error occured.'),
      });
  }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach((key) => {
      const currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls)
          dirtyValues[key] = this.getDirtyValues(currentControl);
        else dirtyValues[key] = currentControl.value;
      }
    });

    return dirtyValues;
  }
}
