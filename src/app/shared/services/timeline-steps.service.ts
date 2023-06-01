import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimelineStepsService {
  constructor(private http: HttpClient) {}

  getTimelineSteps(disputeID: number) {
    return this.http.get(`/litigation/timeline-steps/?dispute_id=${disputeID}`);
  }

  editTimelineSteps(id: number, requestBody: any) {
    return this.http.patch(`/litigation/timeline-steps/${id}/`, requestBody);
  }
}
