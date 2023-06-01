import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArbitratorNotesRoutingModule } from './arbitrator-notes-routing.module';
import { ArbitratorNotesComponent } from './arbitrator-notes.component';
import { ArbitratorNotesInputComponent } from './arbitrator-notes-input/arbitrator-notes-input.component';
import { FormsModule } from '@angular/forms';
import { ArbitratorNoteLanesComponent } from './arbitrator-note-lanes/arbitrator-note-lanes.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [
    ArbitratorNotesComponent,
    ArbitratorNotesInputComponent,
    ArbitratorNoteLanesComponent,
  ],
  imports: [
    CommonModule,
    ArbitratorNotesRoutingModule,
    FormsModule,
    // NzModule Imports
    NzLayoutModule,
    NzRadioModule,
    NzGridModule,
    NzCardModule,
  ],
})
export class ArbitratorNotesModule {}
