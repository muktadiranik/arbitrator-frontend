import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../../state/note.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.scss'],
})
export class NoteAddComponent implements OnInit {
  @Input() lanes$: any;
  @Output() onNewNote = new EventEmitter<any>();

  loading: boolean = false;

  noteForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
    lane: new FormControl('', [Validators.required, Validators.min(1)]),
    dispute: new FormControl(this._noteService.disputeID, [
      Validators.required,
    ]),
  });

  constructor(private _noteService: NoteService) {}

  ngOnInit(): void {}

  addNote() {
    this.loading = true;

    this._noteService
      .addNote(this.noteForm.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((note) => {
        this.noteForm.patchValue({
          text: '',
          lane: '',
        });
        this.onNewNote.emit(note);
      });
  }
}
