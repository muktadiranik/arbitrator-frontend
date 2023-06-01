import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EvidenceTableComponent } from './evidence-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EvidenceTableRoutingModule } from './evidence-table-routing.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [EvidenceTableComponent],
  imports: [
    CommonModule,
    NzTableModule,
    SharedModule,
    EvidenceTableRoutingModule,
    NzEmptyModule,
    NzToolTipModule,
    NzSkeletonModule,
    NzTagModule,
  ],
})
export class EvidencetableModule {}
