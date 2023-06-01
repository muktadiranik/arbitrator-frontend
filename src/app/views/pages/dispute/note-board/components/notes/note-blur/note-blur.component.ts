import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../../../state/note.service';

@Component({
  selector: 'note-blur',
  templateUrl: './note-blur.component.html',
  styleUrls: ['./note-blur.component.scss'],
})
export class NoteBlurComponent implements OnInit {
  @Input() noteID!: number;
  @Input() blur: boolean = false;
  @Output() onChange = new EventEmitter();
  constructor(private _noteService: NoteService) {}
  ngOnInit(): void {}

  onBlur(noteID: number) {
    this.onChange.emit({ id: noteID, is_blur: this.blur, loading: true });
    this._noteService.patchNote(noteID, { is_blur: this.blur }).subscribe(
      (note) => {
        this.onChange.emit({ ...note, loading: false });
      },
      (error) => {
        this.onChange.emit({
          id: noteID,
          is_strike: this.blur,
          loading: false,
        });
      }
    );
  }
}
