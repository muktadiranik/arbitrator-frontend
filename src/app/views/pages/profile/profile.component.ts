import { Address } from './../../../shared/interfaces/auth';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isCompany: boolean = false;
  url: any = '';
  isActor: boolean = false;
  siderIsCollapsed!: Boolean;
  userInfo: any = {};

  constructor(
    private fb: FormBuilder,
    private appSer: AppService,
    private router: Router,
    public location: Location,
    private route: ActivatedRoute,
    private authSer: AuthService,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      user: new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
      }),
      account: ['individual', [Validators.required]],
      category: ['general_contractor'],
      phone_number: ['', [Validators.required, Validators.min(1)]],
      company: [''],
      type: ['creator'],
      address: new FormGroup({
        first_address: new FormControl('', [Validators.required]),
        second_address: new FormControl(''),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [Validators.required]),
      }),
      file: new FormControl(''),
      fileSource: new FormControl(''),
    });

    this.route.snapshot.data['viewType'] == 'edit'
      ? this.getUser()
      : (this.isActor = false);
  }

  siderCollapsed(isCollapsed: Boolean) {
    this.siderIsCollapsed = isCollapsed;
  }

  getUser() {
    this.authRoleService.getCurrentUser().subscribe((res: any) => {
      this.userInfo = res;
      let actor = res.actor;
      // Extracting single address from array of addresses
      if (actor != undefined) {
        let address = actor.user.address[0];
        this.isActor = true;
        this.url = actor.display_picture;

        this.profileForm.get('user')?.setValue({
          first_name: actor.user.first_name,
          last_name: actor.user.last_name,
        });

        this.profileForm.get('account')?.setValue(actor.account);
        this.profileForm.get('category')?.setValue(actor.category);
        this.profileForm.get('phone_number')?.setValue(actor.phone_number);
        this.profileForm.get('company')?.setValue(actor.company);
        this.profileForm.get('type')?.setValue(actor.type);

        this.profileForm.get('address')?.setValue({
          first_address: address.first_address,
          second_address: address.second_address,
          city: address.city,
          state: address.state,
          zip: address.zip,
        });
      }
    });
  }

  accTypeChange(val: string) {
    if (val == 'organization') {
      this.isCompany = true;
      this.profileForm.get('company')?.setValidators([Validators.required]);
      this.profileForm.get('company')?.markAsTouched();
      this.profileForm.get('company')?.updateValueAndValidity();

      this.profileForm
        .get('first_name')
        ?.removeValidators([Validators.required]);
      this.profileForm.get('first_name')?.updateValueAndValidity();

      this.profileForm
        .get('last_name')
        ?.removeValidators([Validators.required]);
      this.profileForm.get('last_name')?.updateValueAndValidity();
    } else {
      this.isCompany = false;
      this.profileForm.get('first_name')?.setValidators([Validators.required]);
      this.profileForm.get('first_name')?.updateValueAndValidity();

      this.profileForm.get('last_name')?.setValidators([Validators.required]);
      this.profileForm.get('last_name')?.updateValueAndValidity();

      this.profileForm.get('company')?.removeValidators([Validators.required]);
      this.profileForm.get('company')?.updateValueAndValidity();
    }
  }

  onProfilePicChange(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event?.target?.result;
      };

      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('display_picture', file);
      this.appSer
        .updateProfile(formData, this.userInfo.actor.id)
        .subscribe((res: any) => {
          this.userInfo.actor.display_picture = res.display_picture;
          this.updateCurrentUser(this.userInfo);
          this.url = res.display_picture;
          this.profileForm.get('file')?.markAsPristine();
        });
    }
  }

  uploadImage() {
    document.getElementById('input')?.click();
  }

  submitForm(type: string): void {
    if (this.profileForm.valid) {
      const formData = new FormData();
      // formData.append('display_picture', file);
      formData.append('account', this.profileForm.get('account')?.value);
      formData.append('category', this.profileForm.get('category')?.value);
      formData.append(
        'phone_number',
        this.profileForm.get('phone_number')?.value
      );
      formData.append(
        'phone_number',
        this.profileForm.get('phone_number')?.value
      );
      formData.append('company', this.profileForm.get('company')?.value);
      formData.append('type', this.profileForm.get('type')?.value);
      formData.append(
        'user',
        JSON.stringify(this.profileForm.get('user')?.value)
      );
      formData.append(
        'address',
        JSON.stringify(this.profileForm.get('address')?.value)
      );

      this.appSer.registerProfile(formData).subscribe((res: any) => {
        this.userInfo.actor = res;
        this.userInfo.first_name = res.user.first_name;
        this.userInfo.last_name = res.user.last_name;
        this.authRoleService.doLoginUser(this.userInfo);
        this.notificationService.success('Profile Registered!');
        if (type == 'dashboard') {
          this.router.navigate(['/dispute/status/waiting-for-sign-up']);
        } else {
          this.router.navigate(['/dispute/new-dispute']);
        }
      });
    } else {
      Object.values(this.profileForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitUpdatedForm(): void {
    let dirtyData = this.getDirtyValues(this.profileForm);
    // User information goes to user api
    if (dirtyData['user'] !== undefined) {
      const user = dirtyData.user;
      delete dirtyData.user;

      this.authSer.editUser(user).subscribe((user: any) => {
        this.userInfo.actor.user = { ...this.userInfo.actor.user, ...user };
        this.updateCurrentUser(this.userInfo);

        this.profileForm.get('user')?.markAsPristine();

        this.notificationService.success('User Updated!');
        this.router.navigate(this.authRoleService.HOME_PAGE);
      });
    }

    if (dirtyData['address'] !== undefined) {
      const address = dirtyData.address;
      delete dirtyData.address;

      this.appSer
        .updateAddress(address, this.userInfo.actor.user.address[0].id)
        .subscribe((address: any) => {
          this.userInfo.actor.user.address[0] = {
            ...this.userInfo.actor.user.address[0],
            ...address,
          };
          this.updateCurrentUser(this.userInfo);

          this.profileForm.get('address')?.markAsPristine();

          this.notificationService.success('Address Updated!');
          this.router.navigate(this.authRoleService.HOME_PAGE);
        });
    }

    // sent rest of the data to /profiles api
    if (dirtyData !== undefined && Object.keys(dirtyData).length > 0) {
      this.appSer
        .updateProfile(dirtyData, this.userInfo.actor.id)
        .subscribe((res: any) => {
          this.userInfo.actor = res;
          this.updateCurrentUser(this.userInfo);

          this.profileForm?.markAsPristine();

          this.notificationService.success('Profile Updated!');
          this.router.navigate(this.authRoleService.HOME_PAGE);
        });
    }
  }

  updateCurrentUser(user: any) {
    this.authRoleService.loggedUser = user;
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

  buildFormData(data: any) {
    const formData = new FormData();

    Object.keys(data).forEach((key: any) => {
      if (typeof data[key] === 'object')
        formData.append(key, JSON.stringify(data[key]));
      else formData.append(key, data[key]);
    });

    return formData;
  }

  signOut() {
    this.authSer.signOut().subscribe(() => {
      this.notificationService.success('Logged Out!');
      this.router.navigate(['/auth/login']);
    });
  }
}
