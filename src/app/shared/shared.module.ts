import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ShowWitnessesComponent } from './components/witness/show-witnesses/show-witnesses.component';
import { UploadWitnessesModalComponent } from './components/witness/upload-witnesses-modal/upload-witnesses-modal.component';
import { WitnessTableComponent } from './components/witness/witness-table/witness-table-component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisputeTableComponent } from '../views/pages/dispute/components/dispute-table/dispute-table.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MMDdYyyyPipe } from './pipes/date/mm-dd-yyyy/mm-dd-yyyy.pipe';
import { YyyyMmDdPipe } from './pipes/date/yyyy-mm-dd/yyyy-mm-dd.pipe';
import { ShowStatus } from './components/show-status/show-status.component';
import { AddOfferComponent } from './components/offers/add-offer/add-offer.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MultiDirectionCardComponent } from './components/multi-direction-card/multi-direction-card.component';
import { ViewDisputeButtonComponent } from '../views/pages/dispute/components/view-dispute/view-dispute-button.component';
import { OffersTableComponent } from './components/offers/offers-table/offers-table.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { OffersComponent } from './components/offers/offers/offers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewOfferComponent } from './components/offers/view-offer/view-offer.component';
import { AddressSubformComponent } from './components/address-subform/address-subform.component';
import { InputLabelComponent } from './components/input-label/input-label.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NotesTableComponent } from '../views/pages/dispute/note-board/components/notes/notes-table/notes-table.component';
import { NotesModalComponent } from './components/notes-modal/notes-modal.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ForRolesDirective } from './directives/for-roles.directive';
import { OffersAvatarComponent } from './components/offers/offers-avatar/offers-avatar.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { UserAvatarComponent } from './components/user-card/components/user-avatar.component';
import { HeadingComponent } from './components/heading/heading.component';
import { AcceptDeclineComponent } from './components/actions/accept-decline/accept-decline.component';
import { DisputeActionsComponent } from './components/actions/dispute-actions/dispute-actions.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RouterModule } from '@angular/router';
import { FileSizeComponent } from './components/file-size/file-size.component';
import { FileExtensionComponent } from './components/file-extension/file-extension.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { AgreementComponent } from './components/agreement/agreement.component';
import { ClaimActionSwiperComponent } from 'src/app/shared/components/swipers/claim-action-swiper/claim-action-swiper.component';
import { DisputeTimelineSwiperComponent } from 'src/app/shared/components/swipers/dispute-timeline-swiper/dispute-timeline-swiper.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { ViewSettlementComponent } from '../views/pages/dispute/components/view-settlement/view-settlement.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  declarations: [
    AddOfferComponent,
    ViewOfferComponent,
    OffersComponent,
    OffersTableComponent,
    NotesTableComponent,
    DisputeTableComponent,
    ViewDisputeButtonComponent,
    ViewSettlementComponent,
    AddressSubformComponent,
    UserDetailComponent,
    MultiDirectionCardComponent,
    ShowStatus,
    MMDdYyyyPipe,
    YyyyMmDdPipe,
    InputLabelComponent,
    NotesModalComponent,
    ForRolesDirective,
    OffersAvatarComponent,
    UserCardComponent,
    NotFoundComponent,
    UserAvatarComponent,
    HeadingComponent,
    AcceptDeclineComponent,
    WitnessTableComponent,
    UploadWitnessesModalComponent,
    ShowWitnessesComponent,
    DisputeActionsComponent,
    FileSizeComponent,
    FileExtensionComponent,
    AgreementComponent,
  ],
  exports: [
    AddOfferComponent,
    DisputeTableComponent,
    ViewDisputeButtonComponent,
    ViewSettlementComponent,
    ViewOfferComponent,
    OffersComponent,
    OffersTableComponent,
    NotesTableComponent,
    DisputeTableComponent,
    UserDetailComponent,
    MultiDirectionCardComponent,
    ShowStatus,
    MMDdYyyyPipe,
    InputLabelComponent,
    AddressSubformComponent,
    ForRolesDirective,
    OffersAvatarComponent,
    UserCardComponent,
    NotFoundComponent,
    UserAvatarComponent,
    HeadingComponent,
    ShowWitnessesComponent,
    DisputeActionsComponent,
    FileSizeComponent,
    FileExtensionComponent,
    DisputeTimelineSwiperComponent,
    AgreementComponent,
    ClaimActionSwiperComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NzIconModule,
    NzTableModule,
    NzPopoverModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzLayoutModule,
    NzTableModule,
    NzSpaceModule,
    NzFormModule,
    NzGridModule,
    NzTypographyModule,
    NzInputModule,
    NzSpinModule,
    NzCardModule,
    NzAvatarModule,
    NzDividerModule,
    NzResultModule,
    NzBadgeModule,
    NzEmptyModule,
    NzDropDownModule,
    NzToolTipModule,
    NzTagModule,
    DisputeTimelineSwiperComponent,
    ClaimActionSwiperComponent,
    NzProgressModule,
    NzModalModule,
    NgxSummernoteModule,
  ],
})
export class SharedModule {}
