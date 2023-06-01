import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteService } from '../../../state/note.service';

@Component({
  selector: 'note-strikethrough',
  templateUrl: './note-strikethrough.component.html',
  styleUrls: ['./note-strikethrough.component.scss'],
})
export class NoteStrikethroughComponent implements OnInit {
  @Input() noteID!: number;
  @Input() strike: boolean = false;
  @Output() onChange = new EventEmitter();
  constructor(private _noteService: NoteService) {}
  ngOnInit(): void {}

  onStrike(noteID: number) {
    this.onChange.emit({ id: noteID, is_strike: this.strike, loading: true });
    this._noteService.patchNote(noteID, { is_strike: this.strike }).subscribe(
      (note) => {
        this.onChange.emit({ ...note, loading: false });
      },
      (error) => {
        this.onChange.emit({
          id: noteID,
          is_strike: this.strike,
          loading: false,
        });
      }
    );
  }
}
