import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteBoardRoutingModule } from './note-board-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { BoardDndComponent } from './components/board/board-dnd/board-dnd.component';
import { BoardDndListComponent } from './components/board/board-dnd-list/board-dnd-list.component';
import { NoteCardComponent } from './components/notes/note-card/note-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LanesService } from './state/lanes.service';
import { NoteService } from './state/note.service';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NoteAddComponent } from './components/notes/note-add/note-add.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NoteDeleteComponent } from './components/notes/note-delete/note-delete.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NoteStrikethroughComponent } from './components/notes/note-strikethrough/note-strikethrough.component';
import { NoteBlurComponent } from './components/notes/note-blur/note-blur.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NoteDrawerComponent } from './components/notes/note-drawer/note-drawer.component';
import { NoteCountersTimelineComponent } from './components/notes/note-counters-timeline/note-counters-timeline.component';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NoteComponent } from './components/notes/note/note.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PlenaryTimerComponent } from '../time-log/components/plenary-timer/plenary-timer.component';
import { CaucusTimerComponent } from '../time-log/components/caucus-timer/caucus-timer.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { CdTimerModule } from 'angular-cd-timer';
import { NoteBoardComponent } from './note-board.component';
@NgModule({
  declarations: [
    NoteBoardComponent,
    BoardComponent,
    BoardDndComponent,
    BoardDndListComponent,
    NoteCardComponent,
    NoteAddComponent,
    NoteDeleteComponent,
    NoteStrikethroughComponent,
    NoteBlurComponent,
    NoteDrawerComponent,
    NoteCountersTimelineComponent,
    NoteComponent,
    PlenaryTimerComponent,
    CaucusTimerComponent,
  ],
  providers: [LanesService, NoteService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoteBoardRoutingModule,
    DragDropModule,
    NzButtonModule,
    NzRadioModule,
    NzInputModule,
    NzIconModule,
    NzSpinModule,
    NzCardModule,
    NzDropDownModule,
    NzTagModule,
    NzBadgeModule,
    NzToolTipModule,
    NzTimelineModule,
    NzSpaceModule,
    NzDividerModule,
    NzEmptyModule,
    NzPageHeaderModule,
    NzModalModule,
    CdTimerModule,
  ],
})
export class NoteBoardModule {}
