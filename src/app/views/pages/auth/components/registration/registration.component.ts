import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AddressSubformComponent } from 'src/app/shared/components/address-subform/address-subform.component';
import { User } from 'src/app/shared/interfaces/auth';
import { Dispute } from 'src/app/shared/interfaces/dispute';
import { AppService } from 'src/app/shared/services/app.service';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActorUtil } from 'src/app/shared/utils/actor';
import { AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  actorUtil = ActorUtil;

  respondent: string = '';
  registrationForm!: FormGroup;
  isCompany: boolean = false;
  type = '';
  url: any = '';
  heading: string = 'Your Claim';
  user!: User;

  showPassword = false;
  showConfirmPassword: boolean = false;

  //accessing address sub-form
  @ViewChild(AddressSubformComponent, { static: true })
  addressSubForm!: AddressSubformComponent;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appSer: AppService,
    private location: Location,
    private appService: AppService,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  getControl(controlName: string): FormControl {
    return this.registrationForm.get(controlName) as FormControl;
  }

  ngOnInit(): void {
    let uuid: string = this.getUUID();

    this.registrationForm = this.fb.group(
      {
        first_name: new FormControl(null, [Validators.required]),
        last_name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.email, Validators.required]),
        confirm_email: new FormControl(null, [
          Validators.email,
          Validators.required,
          this.confirmationEmailValidator,
        ]),
        password: new FormControl(null, [Validators.required]),
        confirm_password: new FormControl(null, [Validators.required]),
        account: new FormControl('individual', [Validators.required]),
        category: new FormControl('general_contractor', [Validators.required]),
        phone_number: new FormControl(''),
        company: new FormControl(null),
        address: this.addressSubForm.createAddressFormGroup(),
        first_address: new FormControl('', [Validators.required]),
        file: new FormControl(''),
        fileSource: new FormControl(''),
        read_terms: new FormControl(false, [Validators.required]),
        agree_terms: new FormControl(false, [Validators.required]),
      },
      {
        validator: this.confirmationPassValidator(
          'password',
          'confirm_password'
        ),
      }
    );

    if (uuid != '') {
      this.appService.getActor(uuid).subscribe({
        next: (actor: any) => {
          this.authRoleService.dispute = actor.dispute;

          this.registrationForm.get('first_name')?.patchValue(actor.first_name);
          this.registrationForm.get('last_name')?.patchValue(actor.last_name);
          this.registrationForm.get('email')?.patchValue(actor.email);
          this.registrationForm.get('confirm_email')?.patchValue(actor.email);

          console.log(actor);

          if (actor.type == 'claimer') {
            this.type = 'claimer';
            this.registrationForm
              .get('account')
              ?.patchValue(actor.dispute.claimer.account);
            this.registrationForm
              .get('company')
              ?.patchValue(actor.dispute.claimer.company);
            this.respondent = `${actor.dispute.respondent.user.first_name} ${actor.dispute.respondent.user.last_name}`;
          } else if (actor.type == 'respondent') {
            this.type = 'respondent';
            this.registrationForm
              .get('account')
              ?.patchValue(actor.dispute.respondent.account);
            this.registrationForm
              .get('company')
              ?.patchValue(actor.dispute.respondent.company);
            this.respondent = `${actor.dispute.claimer.user.first_name} ${actor.dispute.claimer.user.last_name}`;
          } else if (actor.type == 'witness') {
            this.type = 'witness';
            this.heading = 'Witness Registration';
            this.user = actor;

            this.authRoleService.dispute$.subscribe((dispute: any) => {
              console.log(dispute);
              let type = this.authRoleService.getUserCreator(
                this.user,
                dispute
              );
              this.respondent = <string>ActorUtil.fullname(dispute[type]);
            });
          }
        },
        error: () => this.router.navigate(['/']),
      });
    } else {
      if (this.router.url.includes('/registration/arbitrator')) {
        this.type = 'admin';
        this.heading = 'Arbitrator Registration';

        this.registrationForm
          .get('phone_number')
          ?.setValidators(Validators.required);
      }
    }
  }

  uploadImage() {
    document.getElementById('input')?.click();
  }

  onChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event?.target?.result;
      };

      const file = event.target.files[0];
      this.registrationForm.patchValue({
        fileSource: file,
      });
    }
  }

  confirmationEmailValidator = (
    control: FormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value !== this.registrationForm.controls['email'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // confirmationPassValidator = (
  //   control1: FormControl,
  //   control2: FormControl
  // ): { [s: string]: boolean } => {
  //   if (!control1.value) {
  //     return { required: true };
  //   } else if (control1.value !== this.registrationForm.controls['password'].value) {
  //     return { confirm: true, error: true };
  //   }
  //   return {};
  // };

  confirmationPassValidator(passwordKey: string, confirmPasswordKey: string) {
    return (form: FormGroup) => {
      let passwordInput = form.controls[passwordKey],
        confirmPasswordInput = form.controls[confirmPasswordKey];
      if (passwordInput.value !== confirmPasswordInput.value) {
        return confirmPasswordInput.setErrors({ notEquivalent: true });
      } else {
        return confirmPasswordInput.setErrors(null);
      }
    };
  }

  accTypeChange(val: string) {
    if (val == 'organization') {
      this.isCompany = true;
      this.registrationForm
        .get('company')
        ?.setValidators([Validators.required]);
      this.registrationForm.get('company')?.markAsTouched();
      this.registrationForm.get('company')?.updateValueAndValidity();

      this.registrationForm
        .get('first_name')
        ?.removeValidators([Validators.required]);
      this.registrationForm.get('first_name')?.updateValueAndValidity();

      this.registrationForm
        .get('last_name')
        ?.removeValidators([Validators.required]);
      this.registrationForm.get('last_name')?.updateValueAndValidity();
    } else {
      this.isCompany = false;
      this.registrationForm
        .get('first_name')
        ?.setValidators([Validators.required]);
      this.registrationForm.get('first_name')?.updateValueAndValidity();

      this.registrationForm
        .get('last_name')
        ?.setValidators([Validators.required]);
      this.registrationForm.get('last_name')?.updateValueAndValidity();

      this.registrationForm
        .get('company')
        ?.removeValidators([Validators.required]);
      this.registrationForm.get('company')?.updateValueAndValidity();
    }
  }

  getUUID() {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const urlGroup: UrlSegmentGroup = tree.root.children['primary'];
    const urlSegment: UrlSegment[] = urlGroup.segments;

    if (Object.keys(urlSegment[1].parameters).length) {
      return urlSegment[1].parameters['unique-key'];
    }
    return '';
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      let uuid: string = this.getUUID();
      let user = {
        first_name: this.registrationForm.get('first_name')?.value,
        last_name: this.registrationForm.get('last_name')?.value,
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
      };

      let file = this.registrationForm.get('fileSource')?.value || '';

      const formData = new FormData();

      formData.append('user', JSON.stringify(user));
      let address = this.registrationForm.get('address')?.value;
      address['first_address'] =
        this.registrationForm.get('first_address')?.value;
      formData.append(
        'address',
        JSON.stringify(this.registrationForm.get('address')?.value)
      );
      if (this.registrationForm.get('fileSource')?.value != '') {
        formData.append('display_picture', file);
      }

      if (uuid != '') {
        let actor = {
          company: this.registrationForm.get('company')?.value,
          type: this.type,
          account: this.registrationForm.get('account')?.value,
        };

        formData.append('uuid', uuid);
        formData.append('actor', JSON.stringify(actor));

        this.appSer.completeRegistration(formData).subscribe(() => {
          this.notificationService.success('User updated and logged in.');

          this.authRoleService.dispute$
            .pipe(untilDestroyed(this))
            .subscribe((dispute: any) => {
              if (this.type == 'witness') {
                this.router.navigate([
                  'dispute',
                  dispute.id,
                  this.authRoleService.getUserCreator(
                    this.user,
                    <Dispute>this.user.dispute
                  ),
                  'actions',
                ]);
              } else {
                this.router.navigate(['dispute', dispute.id]);
              }

              this.appSer.setEnableSearch(true);
            });
        });
      } else {
        formData.append('account', this.registrationForm.get('account')?.value);
        formData.append(
          'category',
          this.registrationForm.get('category')?.value
        );
        formData.append(
          'phone_number',
          this.registrationForm.get('phone_number')?.value
        );
        formData.append('company', this.registrationForm.get('company')?.value);
        formData.append('type', 'arbitrator');

        //arbitrator registration
        this.appSer.registerProfile(formData).subscribe(() => {
          this.notificationService.success(
            'Arbitrator registered successfully.'
          );

          this.location.back();
        });
      }
    } else {
      Object.values(this.registrationForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
