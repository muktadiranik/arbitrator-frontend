import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArbitratorGuard } from 'src/app/shared/guards/arbitrator.guard';
import { DashboardComponent } from './dispute-dashboard/dashboard.component';
import { DisputeDetailsComponent } from './dispute-details/dispute-details.component';
import { HandoffComponent } from '../claimer-respondent/shared/handoff/handoff.component';
import { DisputeBaseComponent } from './dispute-base/dispute-base.component';
import { DisputeStatusDetailComponent } from './dispute-status-detail/dispute-status-detail.component';
import { DisputeStatusComponent } from './dispute-status/dispute-status.component';
import { NewDisputeComponent } from './shared/new-dispute/new-dispute.component';
import { TermSheetComponent } from './term-sheet/term-sheet.component';
import { TimeLogComponent } from './time-log/time-log.component';
import { ClaimActionsComponent } from './claim/claim-actions/claim-actions.component';
import { DisputeGuard } from 'src/app/shared/guards/dispute.guard';
import { ActorRegistrationComponent } from './shared/actor-registration/actor-registration.component';
import { HandoffDeactivateGuard } from 'src/app/shared/guards/handoff-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'new-dispute', component: NewDisputeComponent },
      {
        path: 'status',
        component: DisputeStatusComponent,
        children: [
          {
            path: 'waiting-for-sign-up',
            component: DisputeStatusDetailComponent,
          },
          { path: 'in-progress', component: DisputeStatusDetailComponent },
          { path: 'resolved', component: DisputeStatusDetailComponent },
          { path: 'unresolved', component: DisputeStatusDetailComponent },
          { path: '', redirectTo: '', pathMatch: 'full' }, //need to figure out
        ],
      },
      {
        path: ':id',
        component: DisputeBaseComponent,
        canActivate: [DisputeGuard],
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
            data: {
              id: 'dashboard',
              roles: ['claimer', 'respondent', 'arbitrator', 'creator'],
            },
          },
          {
            path: 'claimer/summary',
            component: DisputeDetailsComponent,
            data: {
              viewType: 'c',
              id: 'claimer',
              roles: ['respondent', 'arbitrator', 'creator'],
            },
          },
          {
            path: 'respondent/summary',
            component: DisputeDetailsComponent,
            data: {
              viewType: 'r',
              id: 'respondent',
              roles: ['claimer', 'arbitrator', 'creator'],
            },
          },
          {
            path: 'claimer/actions',
            component: ClaimActionsComponent,
            data: {
              viewType: 'c',
              id: 'claimerme',
              roles: ['claimer', 'witness'],
            },
          },
          {
            path: 'respondent/actions',
            component: ClaimActionsComponent,
            data: {
              viewType: 'r',
              id: 'claimerme',
              roles: ['respondent', 'witness'],
            },
          },
          {
            path: 'witness/actions',
            component: ClaimActionsComponent,
            data: {
              viewType: 'w',
              id: 'witnessme',
              roles: ['witness'],
            },
          },
          {
            path: 'witness/:id',
            children: [
              {
                path: 'actions',
                component: ClaimActionsComponent,
              },
            ],
            data: {
              viewType: 'w',
              id: 'witness',
              roles: ['witness', 'arbitrator', 'claimer', 'respondent'],
            },
          },
          {
            path: 'claimer-handoff',
            component: HandoffComponent,
            canDeactivate: [HandoffDeactivateGuard],
            data: { id: 'claimer-handoff', viewType: 'c' },
          },
          {
            path: 'respondent-handoff',
            component: HandoffComponent,
            canDeactivate: [HandoffDeactivateGuard],
            data: { id: 'claimer-handoff', viewType: 'r' },
          },
          {
            path: 'respondent/new',
            component: ActorRegistrationComponent,
            data: { viewType: 'r' },
          },
          {
            path: 'note-board',
            data: { id: 'note-board', roles: ['arbitrator'] },
            loadChildren: () =>
              import('./note-board/note-board.module').then(
                (m) => m.NoteBoardModule
              ),
          },
          {
            path: 'term-sheet',
            data: { id: 'term-sheet', roles: ['arbitrator'] },
            canActivate: [ArbitratorGuard],
            component: TermSheetComponent,
          },
          {
            path: 'timelog',
            data: { id: 'timelog', roles: ['arbitrator'] },
            canActivate: [ArbitratorGuard],
            component: TimeLogComponent,
          },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisputeRoutingModule {}
