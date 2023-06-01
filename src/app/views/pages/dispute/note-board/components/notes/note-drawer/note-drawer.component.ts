import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NoteCountersTimelineComponent } from '../note-counters-timeline/note-counters-timeline.component';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'note-drawer',
  templateUrl: './note-drawer.component.html',
  styleUrls: ['./note-drawer.component.scss'],
})
export class NoteDrawerComponent implements OnInit {
  @Input() note!: any;
  @ViewChild('timeline_comp') timeline_comp!: NoteCountersTimelineComponent;
  @ViewChild('note_comp') note_comp!: NoteComponent;
  constructor(private drawerRef: NzDrawerRef) {}

  ngOnInit(): void {}
  close(): void {
    this.drawerRef.close(this.note);
  }

  addNote(note: any) {
    if (!this.timeline_comp.noteid) this.timeline_comp.noteid = this.note.id;
    this.timeline_comp.reload();
  }
}
