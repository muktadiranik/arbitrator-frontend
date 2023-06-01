import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WitnessService {
  getAllWitnesses() {
    return this.http.get(`/litigation/witnesses/`);
  }
  constructor(private http: HttpClient) {}

  getWitnessById(id: any) {
    return this.http.get(`/litigation/witnesses/${id}/`);
  }

  editWitness(requestBody: any, id: number) {
    return this.http.patch(`/litigation/witnesses/${id}/`, requestBody);
  }

  getDisputeWitnesses(claimId: number) {
    return this.http.get(
      `/litigation/witnesses/?disputes_witnessed__claim=${claimId}`
    );
  }

  getAllWitnessesByCreatorID(creatorId: any, claimID: any) {
    return this.http.get(
      `/litigation/witnesses/?disputes_witnessed__claim=${claimID}&creator__id=${creatorId}`
    );
  }

  deleteWitness(id: any) {
    return this.http.delete(`/litigation/witnesses/${id}/`);
  }
}
