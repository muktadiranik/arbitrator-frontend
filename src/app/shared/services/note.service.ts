import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  addNote(requestBody: any) {
    return this.http.post(`/notes/`, requestBody);
  }

  editNote(requestBody: any, id: any) {
    return this.http.patch(`/notes/${id}/`, requestBody);
  }

  deleteNote(noteId: number) {
    return this.http.delete(`/notes/${noteId}`);
  }

  getNoteDetails(id: number) {
    return this.http.get(`/notes/${id}/`);
  }

  getAllNotes(id: Number) {
    return this.http.get(`/notes/object/litigation/claim/${id}`);
  }

  getAllNotesWithId(type: string, creatorId: any, claimID: any) {
    return this.http.get(
      `/notes/object/litigation/${type}/${claimID}/?author=${creatorId}`
    );
  }
}
