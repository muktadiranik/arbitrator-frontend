import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HandoffService {
  constructor(private http: HttpClient) {}

  getAllEmailDrafts() {
    return this.http.get(`/litigation/email-template/`);
  }

  getEmailDraft(actorId: any, disputeId: any) {
    return this.http.get(
      `/litigation/email-template/?actor_id=${actorId}&dispute_id=${disputeId}`
    );
  }

  createEmailDraft(requestBody: any) {
    return this.http.post(`/litigation/email-template/`, requestBody);
  }

  saveEmailDraft(id: number, requestBody: any) {
    return this.http.patch(`/litigation/email-template/${id}/`, requestBody);
  }
}
