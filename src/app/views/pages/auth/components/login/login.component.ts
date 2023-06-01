import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logInForm!: FormGroup;
  loading = false;

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSer: AuthService,
    private authRoleService: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.logInForm.valid) {
      this.loading = true;
      this.authSer
        .logIn(this.logInForm.value)
        .pipe(switchMap(() => this.authRoleService.getCurrentUser()))
        .subscribe({
          next: (user) => {
            this.loading = false;
            this.router.navigate(this.authRoleService.HOME_PAGE);
          },
          error: ({ error }: any) => {
            this.loading = false;
            if ('actor' in error && !error.actor.length) {
              this.router.navigate(['auth', 'profile']);
            }
          },
        });
    } else {
      Object.values(this.logInForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
