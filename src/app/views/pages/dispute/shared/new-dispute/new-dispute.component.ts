import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DisputeService } from '../dispute.service';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-new-dispute',
  templateUrl: './new-dispute.component.html',
  styleUrls: ['./new-dispute.component.scss'],
})
export class NewDisputeComponent implements OnInit {
  partialRegistration: any;
  defaultDates = [new Date(), new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)];
  isCompany: boolean = false;
  newDisputeForm!: FormGroup;
  dateFormat = 'MM/dd/yyyy';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private disputeSer: DisputeService,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    console.log(this.defaultDates);
    this.newDisputeForm = this.fb.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.min(1)]),
      dispute_type: new FormControl('hearing', [Validators.required]),
      account: ['individual', [Validators.required]],
      company: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      range_picker: new FormControl(this.defaultDates, [Validators.required]),
    });
  }

  get descriptionControl() {
    return this.newDisputeForm.get('description');
  }

  get rangePickerControl() {
    return this.newDisputeForm.get('range_picker');
  }

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date()) < 0;

  submitForm(): void {
    if (this.newDisputeForm.valid) {
      let dates: string[] = [];
      for (const date of this.newDisputeForm.get('range_picker')?.value) {
        let dateObj = date;
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        const newdate: string = year + '-' + month + '-' + day;
        dates.push(newdate);
      }

      let disputeAndDisputantRequestBody = {
        dispute: {
          description: this.newDisputeForm.get('description')?.value,
          start_date: dates[0],
          end_date: dates[1],
          status: 'waiting-for-sign-up',
          type: this.newDisputeForm.get('dispute_type')?.value,
        },

        disputant: {
          user: {
            first_name: this.newDisputeForm.get('first_name')?.value,
            last_name: this.newDisputeForm.get('last_name')?.value,
            email: this.newDisputeForm.get('email')?.value,
          },
          type: 'claimer',
          phone_number: this.newDisputeForm.get('phone')?.value,

          account: this.newDisputeForm.get('account')?.value,
          company: this.newDisputeForm.get('company')?.value,
        },
      };

      this.disputeSer
        .createDisputeAndDisputant(disputeAndDisputantRequestBody)
        .subscribe({
          next: (dispute: any) => {
            this.notificationService.success(
              'Dispute and Claimer have been registered!'
            );
            this.authRoleService.dispute = dispute.dispute;
            this.router.navigate([
              `/dispute/${dispute.dispute.id}/respondent/new`,
            ]);
          },
          error: (e: any) => {
            if (e.error.disputant?.user) {
              this.newDisputeForm.get('email')?.setErrors({
                exists: this.capitalize(e.error.disputant.user[0]),
              });
            }
          },
        });
    } else {
      Object.values(this.newDisputeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  accTypeChange(val: string) {
    if (val == 'organization') {
      this.isCompany = true;
      this.newDisputeForm.get('company')?.setValidators([Validators.required]);
      this.newDisputeForm.get('company')?.markAsTouched();
      this.newDisputeForm.get('company')?.updateValueAndValidity();

      this.newDisputeForm
        .get('first_name')
        ?.removeValidators([Validators.required]);
      this.newDisputeForm.get('first_name')?.updateValueAndValidity();

      this.newDisputeForm
        .get('last_name')
        ?.removeValidators([Validators.required]);
      this.newDisputeForm.get('last_name')?.updateValueAndValidity();
    } else {
      this.isCompany = false;
      this.newDisputeForm
        .get('first_name')
        ?.setValidators([Validators.required]);
      this.newDisputeForm.get('first_name')?.updateValueAndValidity();

      this.newDisputeForm
        .get('last_name')
        ?.setValidators([Validators.required]);
      this.newDisputeForm.get('last_name')?.updateValueAndValidity();

      this.newDisputeForm
        .get('company')
        ?.removeValidators([Validators.required]);
      this.newDisputeForm.get('company')?.updateValueAndValidity();
    }
  }

  capitalize(val: string): string {
    return val[0].toUpperCase() + val.slice(1);
  }
}
