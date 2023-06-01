import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ArbitratorLibraryService } from '../shared/arbitrator-library.service';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-library-checklist',
  templateUrl: './library-checklist.component.html',
  styleUrls: ['./library-checklist.component.scss'],
})
export class LibraryChecklistComponent implements OnInit {
  optionList = [
    { id: 1, name: 'My Checklist' },
    { id: 2, name: 'Project Name' },
    { id: 3, name: 'Firm Checklist' },
    { id: 4, name: 'Training Checklist' },
  ];

  selectedVal!: { id: number; name: string };
  checkList: any[] = [];
  checkLists: any[] = [];
  isCheckListLoaded: boolean = false;
  loading: boolean = false;

  firmsList: any[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalSer: NzModalService,
    private librarySer: ArbitratorLibraryService
  ) {
    this.form = this.fb.group({
      firm: [[]],
    });
  }

  ngOnInit(): void {
    this.getAllChecklistItems();
  }

  getAllChecklistItems(type?: any) {
    let selectedType = type ? type : this.optionList[0];

    let selectedFirm = this.form.get('firm')?.value;

    if (selectedType.name == 'Firm Checklist' && selectedFirm.length) {
      this.selectedFirmChange(selectedFirm);
    } else {
      this.selectedValueChange(selectedType);
    }
  }

  selectedValueChange(selectedVal: { id: number; name: string }) {
    this.selectedVal = selectedVal;
    this.createCheckList(this.selectedVal.name);
    this.firmsList = [];

    if (this.selectedVal.name == 'Firm Checklist') {
      this.getAllFirms();
    }
  }

  getAllFirms() {
    this.librarySer.getAllFirms().subscribe((res: any) => {
      this.firmsList = res;
    });
  }

  selectedFirmChange(changedFirm: any) {
    let firm_id: number[] = [];

    if (changedFirm.length) {
      changedFirm.forEach((firm: any) => {
        firm_id.push(firm.id);
      });

      this.isCheckListLoaded = true;
      this.checkLists = [];

      this.librarySer
        .getFirmFilteredChecklist(firm_id)
        .subscribe((res: any) => {
          this.checkLists = res;
          this.isCheckListLoaded = false;
        });
    } else {
      this.createCheckList(this.selectedVal.name);
    }
  }

  createCheckList(selectedVal: string) {
    this.checkLists = [];
    let requestUrl = '';

    if (selectedVal == 'My Checklist') {
      //   if (clause.type == null && clause.firm == null)
      requestUrl = 'type__isnull=true&firm__isnull=true';
      this.getCheckList(requestUrl);
    } else if (selectedVal == 'Firm Checklist') {
      //   if (clause.type == null && clause.firm != null)
      requestUrl = 'firm__isnull=false';
      this.getCheckList(requestUrl);
    } else if (selectedVal == 'Training Checklist') {
      //   if (clause.type == 'training')
      requestUrl = 'type=training';
      this.getCheckList(requestUrl);
    } else {
      //   if (clause.type == 'global')
      requestUrl = 'type=global';
      this.getCheckList(requestUrl);
    }
  }

  getCheckList(requestUrl: string) {
    this.isCheckListLoaded = true;
    this.librarySer
      .getFilteredChecklist(requestUrl)
      .pipe(finalize(() => (this.isCheckListLoaded = false)))
      .subscribe((res: any) => {
        this.checkLists = res;

        this.checkLists.forEach((checkList: any) => {
          checkList['active'] = false;
          checkList['title'] = 'Show';
        });
      });
  }

  statusChange(checklist: any): void {
    checklist.title = checklist.title == 'Show' ? 'Hide' : 'Show';
  }

  addNewChecklist(): void {
    const modal = this.modalSer.create({
      nzTitle: 'Create Checklist',
      nzContent: CreateChecklistComponent,
      nzClosable: false,
      nzFooter: null,
      nzComponentParams: {
        selectedType: this.selectedVal,
        firmsList: this.firmsList,
      },
    });

    modal.afterClose.subscribe((res: any) => {
      if (res) {
        res['title'] = 'Show';
        this.checkLists.unshift(res);
      }
    });
  }

  action(type: string, checkList: any, index: number, event: any): void {
    //to stop toggling the panel
    event?.stopPropagation();

    switch (type) {
      case 'copy':
        this.copyCheckList(checkList);
        break;

      case 'edit':
        this.editCheckList(checkList, index);
        break;

      case 'delete':
        this.deleteCheckList(checkList, index);
        break;
    }
  }

  copyCheckList(checkList: any) {
    console.log(checkList);
    this.message.create('success', 'CheckList Copied!');
  }

  editCheckList(checkList: any, index: number) {
    if (checkList.firm && !checkList.firm.name) {
      this.loading = true;
      this.librarySer
        .getFirm(checkList.firm)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((firm: any) => {
          checkList.firm = firm;
          this.openEditModal(checkList, index);
        });
    } else {
      this.openEditModal(checkList, index);
    }
  }

  openEditModal(checkList: any, index: number): void {
    const modal = this.modalSer.create({
      nzTitle: 'Edit checklist',
      nzContent: CreateChecklistComponent,
      nzClosable: false,
      nzFooter: null,
      nzComponentParams: {
        selectedType: this.selectedVal,
        firmsList: this.firmsList,
        checklist: checkList,
      },
    });

    modal.afterClose.subscribe((res: any) => {
      if (res) {
        res['title'] = this.checkLists[index].title;
        if (
          res.name != this.checkLists[index].name ||
          res.description != this.checkLists[index].description ||
          JSON.stringify(res.category) !=
            JSON.stringify(this.checkLists[index].category) ||
          this.selectedVal.name == 'Firm Checklist'
        ) {
          res['title'] = 'Show';
        }
        this.checkLists[index] = res;
        // this.statusChange(this.checkLists[index]);
      }
    });
  }

  deleteCheckList(checkList: any, index: number) {
    this.loading = true;
    this.librarySer
      .deleteCheckList(checkList.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => {
        this.message.create('success', 'CheckList Deleted!');
        this.checkLists.splice(index, 1);
      });
  }
}
