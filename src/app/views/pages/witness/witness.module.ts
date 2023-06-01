import { SharedModule } from './../../../shared/shared.module';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { WitnessRoutingModule } from './witness-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WitnessRoutingModule,
    RouterModule,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
    NzButtonModule,
    NzTagModule,
    SharedModule,
    // DemoNgZorroAntdModule,
  ],
  exports: [],
})
export class WitnessModule {}
