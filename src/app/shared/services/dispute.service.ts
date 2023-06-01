import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzThSelectionComponent } from 'ng-zorro-antd/table';

@Injectable({
  providedIn: 'root',
})
export class DisputeService {
  constructor(private http: HttpClient) {}

  getDisputes() {
    return this.http.get(`/litigation/disputes/`);
  }

  getDisputePendingApprovals(disputeId: number) {
    return this.http.get(
      `/litigation/dispute-actor-actions/unassigned-disputes/?action__value=Pending&dispute_id=${disputeId}`
    );
  }

  getDisputesPendingApprovals() {
    return this.http.get(
      '/litigation/dispute-actor-actions/unassigned-disputes/?action__action__name=Approve&action__value=Pending'
    );
  }

  sendDisputeActorActions(body: any) {
    return this.http.post(`/litigation/dispute-actor-actions/`, body);
  }

  getActions() {
    return this.http.get('/litigation/actions/');
  }
  getDisputeDetailsByID(id: number) {
    return this.http.get(`/litigation/disputes/${id}/`);
  }

  getDisputesFilteredData(status: string) {
    return this.http.get(`/litigation/disputes/?status=${status}`);
  }

  getSearchFilteredData(searchVal: string) {
    return this.http.get(`/litigation/disputes/?search=${searchVal}`);
  }

  updateDispute(id: number, requestBody: any) {
    return this.http.patch(`/litigation/disputes/${id}/`, requestBody);
  }

  getAllDisputes() {
    return this.http.get('/litigation/disputes/get-all-disputes/');
  }

  assignDisputeToArbitrator(requestBody: any) {
    return this.http.post(`/litigation/assign-disputes/`, requestBody);
  }
}
