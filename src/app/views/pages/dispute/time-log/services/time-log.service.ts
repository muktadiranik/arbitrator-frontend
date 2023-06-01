import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimeLogService {
  constructor(private http: HttpClient) {}

  createTimelogEntry(requestBody: any) {
    return this.http.post(`/timelog/entries/`, requestBody);
  }

  patchTimelogEntry(id: any, requestBody: any) {
    return this.http.patch(`/timelog/entries/${id}/`, requestBody);
  }

  pausePlenaryTimeLog(requestBody: any, id: any) {
    return this.http.post(`/timelog/entries/${id}/`, requestBody);
  }

  getGeneralTableData(disputeId: any) {
    return this.http.get(`/timelog/entries/?type=G&dispute=${disputeId}`);
  }

  getPlenaryTableData(disputeId: any) {
    return this.http.get(`/timelog/entries/?type=P&dispute=${disputeId}`);
  }

  getCaucusTableData(disputeId: any) {
    return this.http.get(`/timelog/entries/?type=C&dispute=${disputeId}`);
  }

  addTimeLogEntry(requestBody: any) {
    return this.http.post(`/timelog/entries/`, requestBody);
  }

  updateTimeLogEntry(requestBody: any, id: number) {
    return this.http.patch(`/timelog/entries/${id}/`, requestBody);
  }

  deleteTimeLogEntry(id: number) {
    return this.http.delete(`/timelog/entries/${id}/`);
  }

  getTimeLogEntry(id: number) {
    return this.http.get(`/timelog/entries/${id}/`);
  }

  getRemainingDuration(disputeID: any) {
    return this.http.get(
      `/timelog/entries/remaining-duration/?dispute=${disputeID}`
    );
  }
}
