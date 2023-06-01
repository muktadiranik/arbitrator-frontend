import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotesModalComponent } from 'src/app/shared/components/notes-modal/notes-modal.component';
import { Actor } from 'src/app/shared/interfaces/auth';
import { Note } from 'src/app/shared/interfaces/note';
import { NoteService } from 'src/app/shared/services/note.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./notes-table.component.scss'],
})
export class NotesTableComponent implements OnInit {
  @Input() notes: Note[] = [];
  @Input() actor!: Actor;
  @Input() type = 'claim';
  @Input() typeObj!: any;

  @Input() canAdd!: boolean;
  @Input() canEdit!: boolean;
  @Input() canDelete!: boolean;
  @Input() disabled: boolean = false;

  loading = false;
  constructor(
    private modalService: NzModalService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    if (this.typeObj) {
      this.loading = false;
      this.noteService
        .getAllNotesWithId(this.type, this.actor.user.id, this.typeObj.id)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (notes: any) => {
            this.notes = notes;
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  onDelete(note: Note, ind: number) {
    this.loading = true;
    this.noteService.deleteNote(note.id).subscribe({
      next: () => {
        this.notes = this.notes.filter(
          (currNote: Note) => currNote.id != note.id
        );
        // this.toastSer.success('Note deleted.');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  editNotesModal(note: any, ind: number) {
    const modal = this.modalService.create({
      nzContent: NotesModalComponent,
      nzFooter: null,
      nzWidth: '1100px',
      nzCentered: true,
      nzComponentParams: {
        notes: note,
        edit: true,
      },
    });

    modal.afterClose.subscribe((note: any) => {
      this.notes = this.notes.map(
        (obj) => [note].find((eachnote) => eachnote.id === obj.id) || obj
      );
    });
  }

  openNotesModal() {
    const modal = this.modalService.create({
      nzContent: NotesModalComponent,
      nzFooter: null,
      nzWidth: '1100px',
      nzComponentParams: {
        notes: this.notes,
        user: this.actor,
        claim: this.typeObj,
        edit: false,
      },
    });

    modal.afterClose.subscribe((note: any) => {
      if (note != undefined) {
        this.notes.push(note);
        this.notes = [...this.notes]; //not sure why we need to re-create object
      }
    });
  }
}
