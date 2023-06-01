import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  constructor(private http: HttpClient) {}

  startClaim(requestBody: any) {
    return this.http.post(`/litigation/claims/`, requestBody);
  }

  updateClaim(requestBody: any, id: Number) {
    return this.http.patch(`/litigation/claims/${id}/`, requestBody);
  }

  getClaimDetailsByID(id: number) {
    return this.http.get(`/litigation/claims/${id}/`);
  }

  getAllClaimers() {
    return this.http.get('/litigation/claimers/');
  }
}
