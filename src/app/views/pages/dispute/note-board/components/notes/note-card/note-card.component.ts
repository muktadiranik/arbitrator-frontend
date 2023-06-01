import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NoteService } from '../../../state/note.service';
import { NoteDrawerComponent } from '../note-drawer/note-drawer.component';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  loading: boolean = false;
  @Input() isCounter: boolean = false;
  @Input() note: any;
  @Output() onDeleteNote = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onAddNote = new EventEmitter();
  @Output() reloadLane = new EventEmitter();
  // assignees: JUser[];
  // issueTypeIcon: string;
  // priorityIcon: IssuePriorityIcon;
  constructor(
    private _noteService: NoteService,
    private drawerService: NzDrawerService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.isCounter) {
      console.log('creating counter note');
      this.note = {
        ...this.note,
        countered_note: this.note.id,
        lane: this.note.lane,
      };
      if (this.note.base_proposal == null) {
        this.note.base_proposal = this.note.id;
      }
      delete this.note.id;
      delete this.note.text;
    }
    // this._projectQuery.users$.pipe(untilDestroyed(this)).subscribe((users) => {
    //   this.assignees = this.issue.userIds.map((userId) => users.find((x) => x.id === userId));
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const issueChange = changes.issue;
    // if (issueChange?.currentValue !== issueChange.previousValue) {
    //   this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue.type);
    //   this.priorityIcon = IssueUtil.getIssuePriorityIcon(this.issue.priority);
    // }
  }

  openNoteModal(noteId: string) {
    //   this._modalService.create({
    //     nzContent: IssueModalComponent,
    //     nzWidth: 1040,
    //     nzClosable: false,
    //     nzFooter: null,
    //     nzComponentParams: {
    //       issue$: this._projectQuery.issueById$(issueId)
    //     }
    //   });
  }
  deleteNote(note: any) {
    this.loading = note.loading;
    this.onDeleteNote.emit(note);
  }

  onChangeNote(note: any) {
    this.loading = note.loading;
    this.onChange.emit(note);
    this.note = { ...this.note, ...note };
  }
  handleTextAreaClick(e: any) {
    console.log('drag start');
    e.preventDefault();
  }

  onEdit(note: any, save: boolean, body: any = { text: note.text }) {
    note.editable = !note.editable;
    if (save) {
      this.loading = true;
      if (this.isCounter) {
        // console.log('creating counter note')
        // let newCounterNote: any = {...this.note, base_proposal: this.note.id, lane: this.note.lane}
        // delete newCounterNote.id
        this._noteService.addNote(this.note).subscribe(
          (note) => {
            this.loading = false;
            this.note = note;
            this.isCounter = false; //it should no more create another counter
            this.onAddNote.emit(note);
          },
          (error) => (this.loading = false)
        );
      } else {
        this._noteService.patchNote(note.id, body).subscribe(
          (note) => {
            this.loading = false;
            this.onChangeNote(note);
          },
          (error) => (this.loading = false)
        );
      }
    } else {
      note.loading = false;
      this.onChangeNote(note);
    }
  }

  openCounterProposalDrawer(note: any) {
    console.log('opening drawer');
    const drawerRef = this.drawerService.create<
      NoteDrawerComponent,
      { note: any },
      any
    >({
      nzTitle: 'Counter Proposal',
      // nzFooter: 'Footer',
      // nzExtra: 'Extra',
      nzContent: NoteDrawerComponent,
      nzContentParams: {
        note: note,
      },
    });

    // drawerRef.afterOpen.subscribe(() => {
    //   console.log('Drawer(Component) open');
    // });
    drawerRef.getContentComponent()?.note;
    drawerRef.afterClose.subscribe((note) => {
      if (drawerRef.getContentComponent()?.note_comp.newNote) {
        this.reloadLane.emit(
          drawerRef.getContentComponent()?.note_comp.newNote
        );
      }
    });
  }
}
