import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;

  changePasswordForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      old_password: new FormControl('', [Validators.required]),
      new_password1: new FormControl('', [Validators.required]),
      new_password2: new FormControl('', [
        Validators.required,
        this.confirmationValidator,
      ]),
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value !== this.changePasswordForm.controls['new_password1'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  onSubmit() {
    this.authService.changePassword(this.changePasswordForm.value).subscribe({
      next: (response: any) => {
        this.notificationService.success(response.detail);
        this.router.navigate(this.authRoleService.HOME_PAGE);
      },
      error: (error) => {
        console.log('error', error.error);
      },
    });
  }
}
