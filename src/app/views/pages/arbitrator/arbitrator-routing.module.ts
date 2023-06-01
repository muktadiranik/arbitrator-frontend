import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitratorDashboardComponent } from './shared/arbitrator-dashboard/arbitrator-dashboard.component';
import { ArbitratorLibraryComponent } from './shared/arbitrator-library/arbitrator-library.component';
import { ArbitratorNotesComponent } from './shared/arbitrator-notes/arbitrator-notes.component';

const routes: Routes = [
  { path: 'dashboard', component: ArbitratorDashboardComponent },
  {
    path: 'library',
    component: ArbitratorLibraryComponent,
    loadChildren: () =>
      import('./shared/arbitrator-library/arbitrator-library.module').then(
        (m) => m.ArbitratorLibraryModule
      ),
  },
  {
    path: 'cases',
    component: ArbitratorNotesComponent,
    loadChildren: () =>
      import('./shared/arbitrator-notes/arbitrator-notes.module').then(
        (m) => m.ArbitratorNotesModule
      ),
  },
  // { path: 'library', component: ArbitratorLibraryComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArbitratorRoutingModule {}
