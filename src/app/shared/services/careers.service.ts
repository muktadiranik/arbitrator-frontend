import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CareersService {
  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.get(`/careers/job-openings/`);
  }
}
