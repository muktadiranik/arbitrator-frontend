import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'reset-change-password',
  templateUrl: './reset-change-password.component.html',
  styleUrls: ['./reset-change-password.component.scss'],
})
export class ResetChangePasswordComponent implements OnInit {
  @Input() credentials!: string[];
  loading = false;
  showPassword: boolean = false;
  showConfrimPassword: boolean = false;
  resetChangePasswordForm!: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.resetChangePasswordForm = this.fb.group({
      new_password1: [null, [Validators.required]],
      new_password2: [null, [Validators.required, this.confirmationValidator]],
      uid: [this.credentials[0]],
      token: [this.credentials[1]],
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.resetChangePasswordForm.controls[
        'new_password2'
      ].updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value !==
      this.resetChangePasswordForm.controls['new_password1'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submitForm(): void {
    if (this.resetChangePasswordForm.valid) {
      this.loading = true;
      this.authService
        .resetChangePassword(this.resetChangePasswordForm.value)
        .subscribe({
          next: (message: any) => {
            this.message.create('success', message.detail);
            this.router.navigate(['auth', 'login']);
          },
          error: () => (this.loading = false),
        });
    } else {
      Object.values(this.resetChangePasswordForm.controls).forEach(
        (control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        }
      );
    }
  }

  togglePassword(element: string) {
    switch (element) {
      case 'password':
        this.showPassword = !this.showPassword;
        break;

      case 'confirm_password':
        this.showConfrimPassword = !this.showConfrimPassword;
        break;
    }
  }
}
