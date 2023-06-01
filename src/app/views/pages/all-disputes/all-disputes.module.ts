import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisputeModule } from '../dispute/dispute.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { hideTabForRoutes } from '../dispute/models/dispute-tab-titles.model';
import { AllDisputesComponent } from './all-disputes.component';
import { AllDisputesRoutingModule } from './all-disputes-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CreateDisputeComponent } from './components/create-dispute/create-dispute.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [AllDisputesComponent, CreateDisputeComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzSelectModule,
    NzInputModule,
    AllDisputesRoutingModule,
    NzButtonModule,
  ],
})
export class AllDisputesModule {}
