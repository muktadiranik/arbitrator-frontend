import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Offer } from '../interfaces/offer';

@Injectable({ providedIn: 'root' })
export class OffersService {
  // alertSubject = new Subject();
  constructor(private http: HttpClient) {}

  // getAlert() {
  //   return this.alertSubject.asObservable();
  // }

  // sendAlert() {
  //   this.alertSubject.next(true);
  // }

  makeOffer(requestBody: any) {
    return this.http.post(`/litigation/offers/`, requestBody);
  }

  getOffers(claimId: any) {
    return this.http.get(`/litigation/offers/?claim_id=${claimId}`);
  }

  getOffersAgainstClaimId(claimId: any, creatorId: any) {
    return this.http.get<Offer[]>(
      `/litigation/offers/?claim_id=${claimId}&creator__id=${creatorId}`
    );
  }

  updateOffer(offerId: any, requestBody: any) {
    return this.http.patch(`/litigation/offers/${offerId}/`, requestBody);
  }
}
