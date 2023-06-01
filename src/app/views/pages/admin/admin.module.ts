import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ActorsModule } from '../actors/actors.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ActorsRoutingModule } from '../actors/actors-routing.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { StraightToHearingComponent } from './components/straight-to-hearing/straight-to-hearing.component';
import { ArbitratorAssignmentModalComponent } from './components/arbitrator-assignment-modal/arbitrator-assignment-modal.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { JobPostComponent } from './components/job-post/job-post.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [
    AdminComponent,
    StraightToHearingComponent,
    ArbitratorAssignmentModalComponent,
    JobPostComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NzTableModule,
    ActorsRoutingModule,
    NzTabsModule,
    ActorsModule,
    NzLayoutModule,
    NzGridModule,
    NzSpaceModule,
    NzButtonModule,
    NzMenuModule,
    NzSelectModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzDividerModule,
  ],
})
export class AdminModule {}
