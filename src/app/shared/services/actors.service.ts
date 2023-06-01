import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  constructor(private http: HttpClient) {}

  getAllActors(actor: string) {
    return this.http.get(`/litigation/${actor}/`);
  }

  // `/litigation/${respondents}/` for respondents
  // `/litigation/${claimers}/` for claimers
  // `/litigation/${arbitrators}/` for arbitrators
  // `/litigation/${witnesses}/` for witnesses
}
