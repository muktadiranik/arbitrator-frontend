import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TermSheetService {
  constructor(private http: HttpClient) {}

  insertSectionText(id: number, requestBody: any) {
    return this.http.patch(`/term-sheet/sheet-sections/${id}/`, requestBody);
  }

  getAllTermSheet(disputeID: number) {
    return this.http.get(`/term-sheet/sheets/?dispute=${disputeID}`);
  }

  getAllTermSheetTitle() {
    return this.http.get(`/term-sheet/sheet-titles/`);
  }

  getAllTermSheetSectionTitle() {
    return this.http.get(`/term-sheet/section-titles/`);
  }

  deleteTermSheetTitle(id: number) {
    return this.http.delete(`/term-sheet/sheet-titles/${id}/`);
  }

  deleteSectionTitle(id: number) {
    return this.http.delete(`/term-sheet/section-titles/${id}/`);
  }

  addTermSheetTitle(requestBody: any) {
    return this.http.post(`/term-sheet/sheet-titles/`, requestBody);
  }

  addSectionTitle(requestBody: any) {
    return this.http.post(`/term-sheet/section-titles/`, requestBody);
  }

  updateSheetTitle(id: number, requestBody: any) {
    return this.http.put(`/term-sheet/sheets/${id}/`, requestBody);
  }

  updateSectionTitle(id: number, requestBody: any) {
    return this.http.patch(`/term-sheet/sheet-sections/${id}/`, requestBody);
  }

  getAllTermSheetSection(id: number) {
    return this.http.get(`/term-sheet/sheet-sections/?termsheet=${id}`);
  }

  getAllDigitalSignatures(id: number) {
    return this.http.get(`/term-sheet/digital-signatures/?termsheet=${id}`);
  }

  submitTermSheet(requestBody: any) {
    return this.http.post(`/litigation/submit-term-sheet/`, requestBody);
  }

  addDigitalSignature(requestBody: any) {
    return this.http.post(`/term-sheet/digital-signatures/`, requestBody);
  }
}
