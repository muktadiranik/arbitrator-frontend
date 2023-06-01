import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActorsRoutingModule } from './actors-routing.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ActorTableComponent } from '../actor-table/actor-table.component';
import { ActorsComponent } from './actors.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [ActorsComponent, ActorTableComponent],
  imports: [
    CommonModule,
    NzTableModule,
    SharedModule,
    ActorsRoutingModule,
    NzTabsModule,
    NzEmptyModule,
    NzSkeletonModule,
    NzTagModule,
    NzButtonModule,
  ],
  exports: [ActorsComponent],
})
export class ActorsModule {}
