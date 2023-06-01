import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvidenceTableComponent } from './evidence-table.component';

const routes: Routes = [{ path: '', component: EvidenceTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvidenceTableRoutingModule {}
