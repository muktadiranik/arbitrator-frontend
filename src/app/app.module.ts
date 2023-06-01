import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AppHttpInterceptor } from './shared/interceptors/app.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ClaimerComponent } from './views/pages/claimer-respondent/claimer/claimer.component';
import { ViewDisputeComponent } from './views/pages/dispute/view-dispute.component';
import { RespondentComponent } from './views/pages/claimer-respondent/respondent/respondent.component';
import { BaseComponent } from './shared/components/base/base.component';
import { DetailsComponent } from './views/pages/claimer-respondent/shared/details/details.component';
import { ArbitratorComponent } from './views/pages/arbitrator/arbitrator.component';
import { WitnessComponent } from './views/pages/witness/witness.component';
import { ArbitratorDashboardComponent } from './views/pages/arbitrator/shared/arbitrator-dashboard/arbitrator-dashboard.component';
import { GlobalSearchService } from './shared/services/global-search.service';
import { TimePipe } from './shared/pipes/time/time.pipe';
import { AuthRoleService } from './shared/services/auth-role.service';
import { SharedModule } from './shared/shared.module';
import { MMDdYyyyPipe } from './shared/pipes/date/mm-dd-yyyy/mm-dd-yyyy.pipe';
import { YyyyMmDdPipe } from './shared/pipes/date/yyyy-mm-dd/yyyy-mm-dd.pipe';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProfileComponent } from './views/pages/profile/profile.component';
import { ChangePasswordComponent } from './views/pages/profile/change-password/change-password.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ddPipe } from './shared/pipes/date/dd/dd.pipe';
import { MMMdPipe } from './shared/pipes/date/MMM-dd/MMM-dd.pipe';
import { CareersComponent } from './views/pages/careers/careers.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { JobDescriptionComponent } from './views/pages/job-description/job-description.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FooterComponent } from './views/pages/footer/footer.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CareersPipe } from './shared/pipes/filters/careers.pipe';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
    ProfileComponent,
    DetailsComponent,
    ArbitratorComponent,
    ClaimerComponent,
    RespondentComponent,
    WitnessComponent,
    ViewDisputeComponent,
    TimePipe,
    ArbitratorDashboardComponent,
    ChangePasswordComponent,
    CareersComponent,
    JobDescriptionComponent,
    FooterComponent,
    CareersPipe,

    // ActorTableComponent,
  ],
  imports: [
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NzSpinModule,
    NgxUiLoaderModule.forRoot({
      bgsColor: '#1990ff',
      bgsOpacity: 0.6,
      bgsPosition: 'bottom-right',
      bgsSize: 70,
      bgsType: 'ball-spin-fade-rotating',
      blur: 5,
      delay: 0,
      fastFadeOut: true,
      fgsColor: '#eeec45',
      fgsPosition: 'center-right',
      fgsSize: 100,
      fgsType: 'chasing-dots',
      gap: 30,
      logoPosition: 'center-center',
      logoSize: 120,
      logoUrl: '',
      masterLoaderId: 'master',
      overlayBorderRadius: '0',
      overlayColor: 'rgba(40, 40, 40, 0.8)',
      pbColor: 'red',
      pbDirection: 'ltr',
      pbThickness: 3,
      hasProgressBar: true,
      text: '',
      textColor: '#FFFFFF',
      textPosition: 'center-center',
      maxTime: -1,
      minTime: 300,
    }),
    // NgxUiLoaderModule.forRoot({ showForeground: true }),
    // NzModule Imports
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzLayoutModule,
    NzSpaceModule,
    NzDividerModule,
    NzIconModule,
    NzStepsModule,
    NzDropDownModule,
    NzTabsModule,
    NzCalendarModule,
    NzToolTipModule,
    NzModalModule,
    NzMessageModule,
    NzTypographyModule,
    NzTableModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzBadgeModule,
    NzCardModule,
    NzListModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzSkeletonModule,
    NzEmptyModule,
  ],

  providers: [
    TimePipe,
    MMDdYyyyPipe,
    YyyyMmDdPipe,
    ddPipe,
    MMMdPipe,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    AuthRoleService,
    GlobalSearchService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
