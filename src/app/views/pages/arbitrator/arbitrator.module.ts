import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArbitratorRoutingModule } from './arbitrator-routing.module';

import { ArbitratorLibraryComponent } from './shared/arbitrator-library/arbitrator-library.component';
import { LibraryDocumentComponent } from './shared/arbitrator-library/library-document/library-document.component';
import { LibraryClauseComponent } from './shared/arbitrator-library/library-clause/library-clause.component';
import { TreeComponent } from './shared/arbitrator-library/library-document/tree/tree.component';
import { ButtonComponent } from './shared/arbitrator-library/shared/button/button.component';
import { SelectComponent } from './shared/arbitrator-library/shared/select/select.component';
import { ClauseListComponent } from './shared/arbitrator-library/library-clause/clause-list/clause-list.component';
import { CreateClauseComponent } from './shared/arbitrator-library/library-clause/create-clause/create-clause.component';
import { CreateChecklistComponent } from './shared/arbitrator-library/library-checklist/create-checklist/create-checklist.component';
import { LibraryChecklistComponent } from './shared/arbitrator-library/library-checklist/library-checklist.component';
import { TreeV2Component } from './shared/arbitrator-library/library-document/tree-v2/tree-v2.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  declarations: [
    ArbitratorLibraryComponent,
    LibraryDocumentComponent,
    LibraryClauseComponent,
    LibraryChecklistComponent,
    CreateChecklistComponent,
    CreateClauseComponent,
    ClauseListComponent,
    SelectComponent,
    ButtonComponent,
    TreeComponent,
    TreeV2Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArbitratorRoutingModule,
    RouterModule,
    // NzModule Imports
    NzListModule,
    NgxSummernoteModule,
    NzSelectModule,
    NzGridModule,
    NzEmptyModule,
    NzTreeModule,
    NzDropDownModule,
    NzCardModule,
    NzTreeViewModule,
    NzIconModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzDividerModule,
    NzTagModule,
    NzCollapseModule,
    NzInputModule,
    NzTabsModule,
    NzBadgeModule,
    NzSkeletonModule,
    NzSpaceModule,
    SharedModule,
  ],
})
export class ArbitratorModule {}
