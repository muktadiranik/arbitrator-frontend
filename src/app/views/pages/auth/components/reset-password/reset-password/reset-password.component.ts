import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  
  isButtonLoading = false
  params: string[] | null = null
  constructor(
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
    private Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Activatedroute.queryParamMap
       .subscribe((params:any) => {
              if (Object.keys(params.params).length == 2){
                this.params = Object.keys(params.params)
                console.log("this.params",this.params)
              }
                 
});
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, `${message}`);
  }

  resetPasswordEmail = new FormControl('', [Validators.email, Validators.required])

  onSubmit() {
    if (this.resetPasswordEmail.valid) {
      this.isButtonLoading = false
      this.authService.resetPassword({email: this.resetPasswordEmail.value}).subscribe({
        next: (message: any) => {
          this.createMessage('success', message.detail);
          this.router.navigate(['auth', 'login']);
        },
        error: () => this.isButtonLoading = false, 
      });
    }
    else {
      Object.values(this.resetPasswordEmail).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
