import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DisputeTabsService } from '../../dispute-base/dispute-tabs.service';
import { DisputeService } from '../dispute.service';
@UntilDestroy()
@Component({
  selector: 'app-actor-registration',
  templateUrl: './actor-registration.component.html',
  styleUrls: ['./actor-registration.component.scss'],
})
export class ActorRegistrationComponent implements OnInit {
  isCompany: boolean = false;
  respondentRegistrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private disputeSer: DisputeService,
    private router: Router,
    private authRoleService: AuthRoleService,
    private disputeTabsService: DisputeTabsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    //removing tabs from handoff screen
    this.disputeTabsService.tabs = [];

    this.respondentRegistrationForm = this.fb.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.min(1)]),
      account: ['individual', [Validators.required]],
      company: new FormControl(''),
    });
  }

  accTypeChange(val: string) {
    if (val == 'organization') {
      this.isCompany = true;
      this.respondentRegistrationForm
        .get('company')
        ?.setValidators([Validators.required]);
      this.respondentRegistrationForm.get('company')?.markAsTouched();
      this.respondentRegistrationForm.get('company')?.updateValueAndValidity();

      this.respondentRegistrationForm
        .get('first_name')
        ?.removeValidators([Validators.required]);
      this.respondentRegistrationForm
        .get('first_name')
        ?.updateValueAndValidity();

      this.respondentRegistrationForm
        .get('last_name')
        ?.removeValidators([Validators.required]);
      this.respondentRegistrationForm
        .get('last_name')
        ?.updateValueAndValidity();
    } else {
      this.isCompany = false;
      this.respondentRegistrationForm
        .get('first_name')
        ?.setValidators([Validators.required]);
      this.respondentRegistrationForm
        .get('first_name')
        ?.updateValueAndValidity();

      this.respondentRegistrationForm
        .get('last_name')
        ?.setValidators([Validators.required]);
      this.respondentRegistrationForm
        .get('last_name')
        ?.updateValueAndValidity();

      this.respondentRegistrationForm
        .get('company')
        ?.removeValidators([Validators.required]);
      this.respondentRegistrationForm.get('company')?.updateValueAndValidity();
    }
  }

  submitForm() {
    if (this.respondentRegistrationForm.valid) {
      this.authRoleService.dispute$.pipe(take(1)).subscribe((dispute: any) => {
        let partialregistration = {
          user: {
            first_name:
              this.respondentRegistrationForm.get('first_name')?.value,
            last_name: this.respondentRegistrationForm.get('last_name')?.value,
            email: this.respondentRegistrationForm.get('email')?.value,
          },
          type: 'respondent',
          phone_number: this.respondentRegistrationForm.get('phone')?.value,
          account: this.respondentRegistrationForm.get('account')?.value,
          company: this.respondentRegistrationForm.get('company')?.value,
          dispute: {
            code: dispute.code,
          },
        };

        this.disputeSer.partialRegistration(partialregistration).subscribe({
          next: (respondent: any) => {
            dispute.respondent = respondent;

            this.authRoleService.dispute = dispute;
            this.notificationService.success('Respondent Registered!');
            this.router.navigate([`/dispute/${dispute.id}/claimer-handoff`]);
          },
          error: ({ error }: any) => {
            if (error?.user) {
              this.respondentRegistrationForm.get('email')?.setErrors({
                exists: error.user[0],
              });
            }
          },
        });
      });
    } else {
      Object.values(this.respondentRegistrationForm.controls).forEach(
        (control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        }
      );
    }
  }

  capitalize(val: string): string {
    return val[0].toUpperCase() + val.slice(1);
  }
}
