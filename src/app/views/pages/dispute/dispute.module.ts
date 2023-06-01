import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DisputeRoutingModule } from './dispute-routing.module';
import { NewDisputeComponent } from './shared/new-dispute/new-dispute.component';
import { TermSheetCardComponent } from './term-sheet/components/term-sheet-card/term-sheet-card.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NoteBoardModule } from './note-board/note-board.module';
import { TermSheetComponent } from './term-sheet/term-sheet.component';
import { TimeLogComponent } from './time-log/time-log.component';
import { TimeLogCardComponent } from './time-log/components/time-log-card/time-log-card.component';
import { ViewEditTimelogComponent } from './time-log/components/view-edit-timelog/view-edit-timelog.component';
import { AddEditTimelogComponent } from './time-log/components/add-edit-timelog/add-edit-timelog.component';
import { GeneralTableDataComponent } from './time-log/components/general-table-data/general-table-data.component';
import { PlenaryTableDataComponent } from './time-log/components/plenary-table-data/plenary-table-data.component';
import { CaucusTableDataComponent } from './time-log/components/caucus-table-data/caucus-table-data.component';
import { HeadingComponent } from './term-sheet/components/term-sheet-heading/heading.component';
import { DisputeBaseComponent } from './dispute-base/dispute-base.component';
import { DisputeStatusComponent } from './dispute-status/dispute-status.component';
import { DisputeStatusDetailComponent } from './dispute-status-detail/dispute-status-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HandoffComponent } from '../claimer-respondent/shared/handoff/handoff.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DisputeDetailsComponent } from './dispute-details/dispute-details.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { DisputeTimelineComponent } from './dispute-timeline/dispute-timeline.component';
import { DashboardComponent } from './dispute-dashboard/dashboard.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { ClaimModule } from '../claim/claim.module';
import { ClaimActionsComponent } from './claim/claim-actions/claim-actions.component';
import { ClaimDescriptionModalComponent } from './claim/claim-description-modal/claim-description-modal.component';
import { ShowEvidencesComponent } from './evidence/show-evidences/show-evidences.component';
import { UploadEvidenceModalComponent } from './evidence/upload-evidence-modal/upload-evidence-modal.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { DigitalSignatureComponent } from './term-sheet/components/digital-signature/digital-signature.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ActorRegistrationComponent } from './shared/actor-registration/actor-registration.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AwaitingClaimDetailsComponent } from './components/awaiting-claim-details/awaiting-claim-details.component';
import { register } from 'swiper/element/bundle';
import { TermsheetChecklistComponent } from './term-sheet/components/termsheet-checklist/termsheet-checklist.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddChecklistItemComponent } from './term-sheet/components/termsheet-checklist/components/add-checklist-item/add-checklist-item.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { EditDisputeStatusModalComponent } from './edit-dispute-status-modal/edit-dispute-status-modal.component';

register(); // Registering swiper
@NgModule({
  declarations: [
    DisputeStatusComponent,
    DisputeStatusDetailComponent,
    DashboardComponent,
    ClaimActionsComponent,
    ClaimDescriptionModalComponent,
    ShowEvidencesComponent,
    UploadEvidenceModalComponent,
    DisputeTimelineComponent,
    HandoffComponent,
    NewDisputeComponent,
    TermSheetComponent,
    HeadingComponent,
    TermSheetCardComponent,
    DigitalSignatureComponent,
    TimeLogComponent,
    TimeLogCardComponent,
    ViewEditTimelogComponent,
    AddEditTimelogComponent,
    GeneralTableDataComponent,
    PlenaryTableDataComponent,
    CaucusTableDataComponent,
    DisputeBaseComponent,
    DisputeDetailsComponent,
    ActorRegistrationComponent,
    AwaitingClaimDetailsComponent,
    TermsheetChecklistComponent,
    AddChecklistItemComponent,
    EditDisputeStatusModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DisputeRoutingModule,
    RouterModule,
    NgxSummernoteModule,
    ClaimModule,
    NoteBoardModule,
    // NzModule Imports
    NzGridModule,
    NzSpaceModule,
    NzButtonModule,
    NzDividerModule,
    NzCardModule,
    NzTableModule,
    NzIconModule,
    NzTagModule,
    NzToolTipModule,
    NzSpinModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzDropDownModule,
    NzDatePickerModule,
    NzTabsModule,
    NzDrawerModule,
    NzNotificationModule,
    NzTypographyModule,
    NzLayoutModule,
    NzStepsModule,
    NzPopconfirmModule,
    NzAvatarModule,
    NzEmptyModule,
    NzResultModule,
    NzMenuModule,
    NzListModule,
    NzCheckboxModule,
    NzTreeSelectModule,
    NzUploadModule,
  ],
})
export class DisputeModule {}
