import { StraightToHearingComponent } from './components/straight-to-hearing/straight-to-hearing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { JobPostComponent } from './components/job-post/job-post.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dispute',
        loadChildren: () =>
          import('../all-disputes/all-disputes.module').then(
            (m) => m.AllDisputesModule
          ),
      },
      {
        path: 'actors',
        loadChildren: () =>
          import('../actors/actors.module').then((m) => m.ActorsModule),
      },
      {
        path: 'evidence',
        loadChildren: () =>
          import('../evidence-table/evidencetable.module').then(
            (m) => m.EvidencetableModule
          ),
      },

      {
        path: 'dispute',
        loadChildren: () =>
          import('../all-disputes/all-disputes.module').then(
            (m) => m.AllDisputesModule
          ),
      },

      {
        path: 'straight-to-hearing',
        component: StraightToHearingComponent,
      },
      {
        path: 'job-post',
        component: JobPostComponent,
      },

      {
        path: '',
        redirectTo: 'dispute',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
