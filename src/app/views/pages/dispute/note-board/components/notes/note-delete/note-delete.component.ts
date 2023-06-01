import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteService } from '../../../state/note.service';

@Component({
  selector: 'note-delete',
  templateUrl: './note-delete.component.html',
  styleUrls: ['./note-delete.component.scss'],
})
export class NoteDeleteComponent implements OnInit {
  @Input() noteID!: number;
  @Output() onDeleteNote = new EventEmitter();
  constructor(private _noteService: NoteService) {}

  ngOnInit(): void {}

  deleteNote(noteID: number) {
    this.onDeleteNote.emit({ id: noteID, loading: true, delete: false });
    this._noteService.deleteNote(noteID).subscribe(
      (note) => {
        this.onDeleteNote.emit({ id: noteID, loading: false, delete: true });
      },
      (error) => {
        this.onDeleteNote.emit({ id: noteID, loading: false, delete: false });
      }
    );
  }
}
