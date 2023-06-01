import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() noteid!: number;
  @Input() note!: any;
  @Output() onAddNote = new EventEmitter();
  newNote: any;
  constructor() {}

  ngOnInit(): void {
    if (!this.note) {
      //subscribe to get the note from api
    }
    this.note = { ...this.note };
    this.note.editable = true;
  }

  addNote(note: any) {
    this.newNote = note;
    this.onAddNote.emit(note);
  }
}
