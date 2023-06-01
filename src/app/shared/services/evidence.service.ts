import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EvidenceService {
  constructor(private http: HttpClient) {}

  addEvidence(formData: any) {
    return this.http.post(`/litigation/evidences/`, formData);
  }

  uploadEvidence(requestBody: any) {
    return this.http.post(`/litigation/evidences/`, requestBody);
  }

  getAllEvidencesWithId(creatorId: any, claimID: any) {
    return this.http.get(
      `/litigation/evidences/?claim_id=${claimID}&creator__id=${creatorId}`
    );
  }

  getEvidences() {
    return this.http.get('/litigation/evidences/get-all-evidences/');
  }

  deleteEvidence(id: any) {
    return this.http.delete(`/litigation/evidences/${id}/`);
  }
}
