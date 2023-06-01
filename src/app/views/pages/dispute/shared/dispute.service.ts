import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisputeService {
  constructor(private http: HttpClient) {}

  createDispute(requestBody: any) {
    return this.http.post('/litigation/disputes/', requestBody);
  }

  createBulkDisputes(requestBody: any) {
    return this.http.post(
      `/litigation/disputes/create-bulk-disputes/`,
      requestBody
    );
  }

  partialRegistration(requestBody: any) {
    return this.http.post('/litigation/partial-registration/', requestBody);
  }

  getDisputeById(id: any) {
    return this.http.get(`/litigation/disputes/${id}/`);
  }

  createDisputeAndDisputant(requestBody: any) {
    return this.http.post('/litigation/disputes/new-dispute/', requestBody);
  }

  getSettlementAgreement(disputeId: number) {
    return this.http
      .get(`/litigation/settlement-agreement/?dispute_id=${disputeId}`)
      .pipe(map((res: any) => res[0]));
  }

  updateSettlementAgreement(settlementAgreementId: number, requestBody: any) {
    return this.http.patch(
      `/litigation/settlement-agreement/${settlementAgreementId}/`,
      requestBody
    );
  }
}
