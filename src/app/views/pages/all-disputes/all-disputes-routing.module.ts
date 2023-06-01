import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDisputesComponent } from './all-disputes.component';

const routes: Routes = [{ path: '', component: AllDisputesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllDisputesRoutingModule {}
