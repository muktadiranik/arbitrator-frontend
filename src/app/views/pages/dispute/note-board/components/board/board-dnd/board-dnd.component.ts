import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { GlobalSearchService } from 'src/app/shared/services/global-search.service';
import { LanesService } from '../../../state/lanes.service';
import { NoteService } from '../../../state/note.service';

@Component({
  selector: 'board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss'],
})
export class BoardDndComponent implements OnInit, OnDestroy {
  lanes$: any;
  newNote: any = {};
  searchSubscription?: Subscription;
  filteredNotes: any = [];

  constructor(
    private lanesService: LanesService,
    private _noteService: NoteService,
    private globalSearchService: GlobalSearchService,
    private authRoleService: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.globalSearchService.seachFieldOptions$.next({
      placeHolder: 'Search Notes',
    });
    this.lanes$ = this.authRoleService.dispute$.pipe(
      switchMap((dispute) => this.lanesService.getLanes(dispute.id))
    );
    this.searchSubscription = this.globalSearchService.searchTermAsObservable$
      .pipe(
        switchMap((searchQuery: string) =>
          this._noteService.search(searchQuery)
        )
      )
      .subscribe((notes: string) => {
        this.filteredNotes = notes;
        console.log('search result is ', notes);
      });
  }
  public ngOnDestroy(): void {
    this.lanes$.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.globalSearchService.seachFieldOptions$.next({ placeHolder: '' });
  }

  onNewNote(note: any) {
    this.newNote = note;
  }
}
