import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { NoteService } from '../../../state/note.service';

@Component({
  selector: 'note-counters-timeline',
  templateUrl: './note-counters-timeline.component.html',
  styleUrls: ['./note-counters-timeline.component.scss'],
})
export class NoteCountersTimelineComponent implements OnInit {
  @Input() noteid!: any;
  loading: boolean = true;
  note: any;
  noteObs!: any;
  constructor(
    private _noteService: NoteService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.noteObs = this._noteService
      .getProposalHistory(this.noteid)
      .pipe(filter((x) => x != null))
      .subscribe(
        (note) => {
          this.loading = false;
          this.note = note;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  reload() {
    this.noteObs.unsubscribe();
    this.loading = true;
    this.noteObs = this._noteService.getProposalHistory(this.noteid).subscribe(
      (note) => {
        this.loading = false;
        this.note = note;
        this.ref.detectChanges();
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
