import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { AppGuard } from 'src/app/shared/guards/app-guard.guard';
import { ProfileComponent } from '../profile/profile.component';
import { AuthBaseComponent } from './components/auth-base/auth-base.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';
import { AgreementComponent } from 'src/app/shared/components/agreement/agreement.component';

function SignupUrlMatcher(url: UrlSegment[]) {
  if (
    url.length &&
    !Object.keys(url[0].parameters).length &&
    url[0].path == 'signup'
  ) {
    return {
      consumed: url,
    };
  }
  return null;
}

function InvitaionUrlMatcher(url: UrlSegment[]) {
  if (
    url.length &&
    Object.keys(url[0].parameters).length &&
    url[0].path == 'signup'
  ) {
    return {
      consumed: url,
    };
  }
  return null;
}

const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    children: [
      {
        path: '',
        component: AuthBaseComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { matcher: SignupUrlMatcher, component: SignupComponent },
          { path: 'reset-password', component: ResetPasswordComponent },
        ],
      },
      {
        matcher: InvitaionUrlMatcher,
        component: RegistrationComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { viewType: 'auth' },
      },
      {
        path: 'agreement',
        component: AgreementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
