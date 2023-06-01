import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AuthBaseComponent } from './components/auth-base/auth-base.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyComponent, NzTypographyModule } from 'ng-zorro-antd/typography';
import { ResetChangePasswordComponent } from './components/reset-password/reset-change-password/reset-change-password.component';
@NgModule({
  declarations: [
    AuthBaseComponent,
    LoginComponent,
    SignupComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    ResetChangePasswordComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzGridModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzCheckboxModule,
    FormsModule,
    NzLayoutModule,
    NzDividerModule,
    NzSpaceModule,
    NzTypographyModule,
  ],
})
export class AuthModule {}
