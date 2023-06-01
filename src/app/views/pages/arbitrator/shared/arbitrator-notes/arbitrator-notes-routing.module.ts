import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitratorNotesComponent } from './arbitrator-notes.component';

const routes: Routes = [{ path: '', component: ArbitratorNotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArbitratorNotesRoutingModule {}
