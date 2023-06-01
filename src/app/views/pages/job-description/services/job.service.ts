import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JobService {
  constructor(private http: HttpClient) {}

  getJobDescription(id: number) {
    return this.http.get(`/careers/job-openings/${id}/`);
  }

  getJobDetails() {
    return this.http.get(`/careers/job-details/`);
  }

  postJobDetails(requestBody: any) {
    return this.http.post(`/careers/job-details/`, requestBody);
  }

  postJob(requestBody: any) {
    return this.http.post(`/careers/job-openings/`, requestBody);
  }

  submitExperience(requestBody: any) {
    return this.http.post(`/careers/experiences/`, requestBody);
  }

  submitApplication(requestBody: any) {
    return this.http.post(`/careers/job-applications/`, requestBody);
  }

  submitForReview(requestBody: any) {
    return this.http.post(
      `/careers/job-applications/submit-job-application/`,
      requestBody
    );
  }
}
