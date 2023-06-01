import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, empty, of } from 'rxjs';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  disputeID!: any;

  constructor(private http: HttpClient, private authRole: AuthRoleService) {
    this.authRole.dispute$.subscribe((dispute: any) => {
      this.disputeID = dispute.id;
    });
  }

  search(searchQuery: string) {
    return this.http.get(
      `/noteboard/notes/?search=${searchQuery}&dispute_id=${this.disputeID}`
    );
  }

  getNotes(laneID: number) {
    return this.http.get(
      `/noteboard/notes/?lane=${laneID}&dispute=${this.disputeID}`
    );
  }

  patchNote(noteID: number, body: any) {
    return this.http.patch(`/noteboard/notes/${noteID}/`, body);
  }

  addNote(body: any) {
    return this.http.post(`/noteboard/notes/`, body);
  }

  deleteNote(noteID: number) {
    return this.http.delete(`/noteboard/notes/${noteID}/`);
  }

  getProposalHistory(noteID: number) {
    return this.http.get(`/noteboard/notes/${noteID}/proposal-history/`);
  }
}
