import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './shared/components/base/base.component';
import { ArbitratorComponent } from './views/pages/arbitrator/arbitrator.component';
import { ClaimerComponent } from './views/pages/claimer-respondent/claimer/claimer.component';
import { ViewDisputeComponent } from './views/pages/dispute/view-dispute.component';
import { WitnessComponent } from './views/pages/witness/witness.component';
import { ArbitratorGuard } from './shared/guards/arbitrator.guard';
import { RespondentComponent } from './views/pages/claimer-respondent/respondent/respondent.component';
import { AuthGuard } from './shared/guards/auth-guard';
import { ProfileComponent } from './views/pages/profile/profile.component';
import { ChangePasswordComponent } from './views/pages/profile/change-password/change-password.component';
import { CareersComponent } from './views/pages/careers/careers.component';
import { JobDescriptionComponent } from './views/pages/job-description/job-description.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'careers',
    component: CareersComponent,
  },
  {
    path: 'job/:id',
    component: JobDescriptionComponent,
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        children: [
          { path: '', component: ProfileComponent, data: { viewType: 'edit' } },
          { path: 'change-password', component: ChangePasswordComponent },
        ],
      },
      {
        path: 'dispute',
        component: ViewDisputeComponent,
        loadChildren: () =>
          import('./views/pages/dispute/dispute.module').then(
            (m) => m.DisputeModule
          ),
      },
      {
        path: 'arbitrator',
        component: ArbitratorComponent,
        loadChildren: () =>
          import('./views/pages/arbitrator/arbitrator.module').then(
            (m) => m.ArbitratorModule
          ),
      },
      {
        path: 'witness',
        component: WitnessComponent,
        loadChildren: () =>
          import('./views/pages/witness/witness.module').then(
            (m) => m.WitnessModule
          ),
      },
      // {
      //   path: 'evidence',
      //   loadChildren: () =>
      //     import('./views/pages/evidence-table/evidencetable.module').then(
      //       (m) => m.EvidencetableModule
      //     ),
      // },
      // {
      //   path: 'actors',
      //   loadChildren: () =>
      //     import('./views/pages/actors/actors.module').then(
      //       (m) => m.ActorsModule
      //     ),
      // },
      {
        path: 'admin',
        loadChildren: () =>
          import('./views/pages/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'claimer',
        component: ClaimerComponent,
        loadChildren: () =>
          import(
            './views/pages/claimer-respondent/claimer/claimer.module'
          ).then((m) => m.ClaimerModule),
      },
      {
        path: 'respondent',
        component: RespondentComponent,
        loadChildren: () =>
          import(
            './views/pages/claimer-respondent/respondent/respondent.module'
          ).then((m) => m.RespondentModule),
      },
      { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
  providers: [ArbitratorGuard],
})
export class AppRoutingModule {}
