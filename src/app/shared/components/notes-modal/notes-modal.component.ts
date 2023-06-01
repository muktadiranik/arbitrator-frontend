import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NoteService } from 'src/app/shared/services/note.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notes-modal',
  templateUrl: './notes-modal.component.html',
  styleUrls: ['./notes-modal.component.scss'],
})
export class NotesModalComponent implements OnInit {
  @Input() notes: any;
  @Input() claim: any;
  @Input() user: any;
  @Input() edit: boolean = false;

  loading = false;
  mode: string = 'Add';
  description = '';

  constructor(
    private modal: NzModalRef,
    private noteService: NoteService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.mode = this.edit ? 'Edit' : 'Add';
    console.log('this.user', this.user);
    if (this.edit) {
      this.noteService
        .getNoteDetails(Number(this.notes.id))
        .subscribe((note: any) => {
          this.description = note.content;
        });
    }
  }

  showTable(): boolean {
    return Array.isArray(this.notes) && this.notes.length > 0;
  }

  addNotes() {
    this.loading = true;
    let requestBody = {
      title: '',
      content: this.description,
      tags: [],
      app_label: 'litigation',
      model_class: 'claim',
      obj_id: this.claim.id,
      author: this.user.id,
    };

    this.noteService.addNote(requestBody).subscribe({
      next: (note: any) => {
        this.notificationService.success('Note Added.');
        this.loading = false;
        this.modal.close(note);
      },
      error: () => (this.loading = false),
    });
  }

  editNotes() {
    let requestBody = {
      content: this.description,
    };
    this.loading = true;
    this.noteService.editNote(requestBody, this.notes.id).subscribe({
      next: (note: any) => {
        this.notificationService.success('Note Updated.');
        this.loading = false;
        this.modal.close(note);
      },

      error: () => (this.loading = false),
    });
  }
}
