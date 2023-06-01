import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  enableSearch = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getActor(uuid: string) {
    return this.http.get(`/litigation/partial-registration/get-actor/${uuid}/`);
  }

  getEnableSearch() {
    return this.enableSearch.asObservable();
  }

  setEnableSearch(enable: boolean) {
    this.enableSearch.next(enable);
  }

  registerProfile(formData: any) {
    return this.http.post('/litigation/register/profile/', formData);
  }

  completeRegistration(formData: any) {
    return this.http.patch(`/litigation/complete-registration/`, formData);
  }

  sendInvitation(requestBody: any) {
    return this.http.post(
      `/litigation/partial-registration/send/invitation/`,
      requestBody
    );
  }

  updateProfile(formData: any, id: any) {
    return this.http.patch(`/litigation/profiles/${id}/`, formData);
  }

  updateAddress(formData: any, id: any) {
    return this.http.patch(`/litigation/address/${id}/`, formData);
  }
}
