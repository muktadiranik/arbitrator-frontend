import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { NoteService } from '../../../state/note.service';

@Component({
  selector: '[board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@UntilDestroy()
export class BoardDndListComponent implements OnInit {
  @Input() status: any;
  @Input() currentUserId: any;
  @Input() lane: any;
  @Input()
  set filteredNotes(filteredNotes: any) {
    // console.log('filteredNotes ',filteredNotes.filter((note:any)=>note.lane == this.lane.id))
    this.notes = filteredNotes.filter((note: any) => note.lane == this.lane.id);
    // if(note.lane == this.lane.id){
    //new note has been set
    // this.notes.push(note)
    // }
  }
  @Input()
  set newNote(note: any) {
    if (note.lane == this.lane.id) {
      //new note has been set
      this.notes.push(note);
    }
  }
  notes: any[] = [];
  // @Input() notes$: Observable<any>;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  // NoteStatusDisplay = IssueStatusDisplay;
  loading: boolean = true;

  // get notesCount(): number {
  //   return this.notes.length;
  // }
  reloadLane(note: any) {
    this.ngOnInit(note.lane);
  }
  constructor(private noteService: NoteService) {}

  ngOnInit(currentLane: any = this.lane.id): void {
    this.noteService.getNotes(currentLane).subscribe((data: any) => {
      this.notes = data;
      this.loading = false;
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    const newNote: any = { ...event.item.data };
    let newIssues = [...event.container.data];
    if (event.previousContainer === event.container) {
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      this.notes = newIssues;
      this.updateListPosition(newIssues);
    } else {
      this.updateListPosition(newIssues);
      this.noteService
        .patchNote(newNote.id, { lane: event.container.id })
        .subscribe((note: any) => {
          // console.log('newIssues', newIssues)
          // newIssues = newIssues.map(obj => [note].find(eachnote => eachnote.id === obj.id) || obj);
          // console.log('newIssues2', newIssues, note)
          // event.item.data = note
          transferArrayItem(
            event.previousContainer.data,
            newIssues,
            event.previousIndex,
            event.currentIndex
          );
          this.notes = [...newIssues];
          this.notes = this.notes.map(
            (obj) => [note].find((eachnote) => eachnote.id === obj.id) || obj
          );
        });
      // newNote.status = event.container.id as IssueStatus;
      // this._projectService.updateIssue(newNote);
    }
  }

  // isDateWithinThreeDaysFromNow(date: string) {
  //   const now = new Date();
  //   const inputDate = new Date(date);
  //   return dateFns.isAfter(inputDate, dateFns.subDays(now, 3));
  // }

  private updateListPosition(newList: any[]) {
    newList.forEach((issue, idx) => {
      const newIssueWithNewPosition = { ...issue, listPosition: idx + 1 };
      // this._projectService.updateIssue(newIssueWithNewPosition);
    });
  }

  deleteNote(deletedNote: any) {
    if (deletedNote.delete) {
      this.notes = this.notes.filter((note) => note.id != deletedNote.id);
    }
  }
  onChangeNote(changedNote: any) {
    if (!changedNote.loading) {
      this.notes = this.notes.map(
        (obj) => [changedNote].find((eachnote) => eachnote.id === obj.id) || obj
      );
    }
  }
}
