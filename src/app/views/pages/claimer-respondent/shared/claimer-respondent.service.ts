import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClaimerRespondentService {
  alertSubject = new Subject<any>();
  tableDataSubject = new Subject<any>();
  constructor() {}

  sendAlert(val: any) {
    this.alertSubject.next(val);
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }
}
