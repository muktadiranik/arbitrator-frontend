import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArbitratorLibraryService {
  constructor(private http: HttpClient) {}

  toggleTermsheetChecklistItem(id: number, requestBody: any) {
    return this.http.patch(
      `/library/termsheet-checklist-items/${id}/`,
      requestBody
    );
  }

  getAllFirms() {
    return this.http.get(`/library/firm/`);
  }

  getFirm(id: number) {
    return this.http.get(`/library/firm/${id}/`);
  }

  getFirmFilteredFolder(firmId: number[]) {
    return this.http.get(
      `/library/folder/get-folders-hierarchy/?firm__in=${firmId}`
    );
  }

  getFirmFilteredClause(firmId: number[]) {
    return this.http.get(`/library/clause/?firm__in=${firmId}`);
  }

  getFirmFilteredChecklist(firmId: number[]) {
    return this.http.get(`/library/checklists/?firm__in=${firmId}`);
  }

  getFilteredFolder(requestUrl: string) {
    return this.http.get(
      `/library/folder/get-folders-hierarchy/?${requestUrl}`
    );
  }

  getFilteredClause(requestUrl: string) {
    return this.http.get(`/library/clause/?${requestUrl}`);
  }

  getFilteredChecklist(requestUrl: string) {
    return this.http.get(`/library/checklists/?${requestUrl}`);
  }

  getAllClauses() {
    return this.http.get(`/library/clause/`);
  }

  createClause(requestBody: any) {
    return this.http.post(`/library/clause/`, requestBody);
  }

  editClause(requestBody: any, id: number) {
    return this.http.patch(`/library/clause/${id}/`, requestBody);
  }

  deleteClause(id: number) {
    return this.http.delete(`/library/clause/${id}/`);
  }

  getClauseById(id: number) {
    return this.http.get(`/library/clause/${id}/`);
  }

  getAllFolders() {
    return this.http.get(`/library/folder/`);
  }

  createFolder(requestBody: any) {
    return this.http.post(`/library/folder/`, requestBody);
  }

  renameFolder(id: number, requestBody: any) {
    return this.http.patch(`/library/folder/${id}/`, requestBody);
  }

  deleteFolder(id: number) {
    return this.http.delete(`/library/folder/${id}/`);
  }

  uploadFile(formData: any) {
    return this.http.post(`/library/files/`, formData);
  }

  deleteFile(id: number) {
    return this.http.delete(`/library/files/${id}/`);
  }

  renameFile(id: number, formData: any) {
    return this.http.patch(`/library/files/${id}/`, formData);
  }

  getAllCategories() {
    return this.http.get(`/library/category/`);
  }

  getAllChecklistCategories() {
    return this.http.get(`/library/checklist-category/`);
  }

  deleteTermsheetChecklistItem(id: number) {
    return this.http.delete(`/library/termsheet-checklist-items/${id}/`);
  }

  updateChecklistItem(id: number, type: string, requestBody: any) {
    return this.http.patch(`/library/${type}/${id}/`, requestBody);
  }

  addTermsheetChecklistItem(requestBody: any) {
    return this.http.post(`/library/termsheet-checklist-items/`, requestBody);
  }

  addCategoryItem(requestBody: any) {
    return this.http.post(`/library/category/`, requestBody);
  }

  addChecklistCategoryItem(requestBody: any) {
    return this.http.post(`/library/checklist-category/`, requestBody);
  }

  getAllChecklist() {
    return this.http.get(`/library/checklists/`);
  }

  createChecklist(requestBody: any) {
    return this.http.post(`/library/checklists/`, requestBody);
  }

  editChecklist(requestBody: any, id: number) {
    return this.http.patch(`/library/checklists/${id}/`, requestBody);
  }

  deleteCheckList(id: number) {
    return this.http.delete(`/library/checklists/${id}/`);
  }

  getChecklistById(id: number) {
    return this.http.get(`/library/checklists/${id}/`);
  }

  addCheckListItem(requestBody: any) {
    return this.http.post(`/library/checklist-items/`, requestBody);
  }

  deleteChecklistItem(id: number) {
    return this.http.delete(`/library/checklist-items/${id}/`);
  }
}
