import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanesService {
  constructor(private http: HttpClient) {}

  getLanes(disputeID: any) {
    return this.http.get(`/noteboard/lanes/?dispute=${disputeID}`);
  }
}
