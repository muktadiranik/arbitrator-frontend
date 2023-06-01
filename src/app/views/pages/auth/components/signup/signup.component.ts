import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authSer: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password1: [null, [Validators.required]],
      password2: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.signUpForm.controls['password2'].updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls['password1'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submitForm(): void {
    if (this.signUpForm.valid) {
      this.authSer.signUp(this.signUpForm.value).subscribe({
        next: () => {
          // this.authSer.user().subscribe((res: any) => {
          this.router.navigate(['auth', 'profile']);
          // });
        },
      });
    } else {
      Object.values(this.signUpForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
