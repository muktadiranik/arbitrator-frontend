import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ArbitratorLibraryService } from '../shared/arbitrator-library.service';
import { CreateClauseComponent } from './create-clause/create-clause.component';
import { NzSpaceComponent } from 'ng-zorro-antd/space';
@Component({
  selector: 'app-library-clause',
  templateUrl: './library-clause.component.html',
  styleUrls: ['./library-clause.component.scss'],
})
export class LibraryClauseComponent implements OnInit {
  optionList = [
    { id: 1, name: 'My Clauses' },
    { id: 2, name: 'Project Name' },
    { id: 3, name: 'Firm Clauses' },
    { id: 4, name: 'Training Clauses' },
  ];

  selectedVal!: { id: number; name: string };
  clauseList: any[] = [];
  isClauseListLoading: boolean = false;

  firmsList: any[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalSer: NzModalService,
    private librarySer: ArbitratorLibraryService
  ) {
    this.form = this.fb.group({
      firm: [[]],
    });
  }

  ngOnInit(): void {
    this.getAllClauses();
  }

  getAllClauses(type?: any) {
    let selectedType = type ? type : this.optionList[0];

    let selectedFirm = this.form.get('firm')?.value;

    if (selectedType.name == 'Firm Clauses' && selectedFirm.length) {
      this.selectedFirmChange(selectedFirm);
    } else {
      this.selectedValueChange(selectedType);
    }
  }

  selectedValueChange(selectedVal: { id: number; name: string }) {
    this.selectedVal = selectedVal;

    this.createClauseList(this.selectedVal.name);
    this.firmsList = [];

    if (this.selectedVal.name == 'Firm Clauses') {
      this.getAllFirms();
    }
  }

  getAllFirms() {
    this.librarySer.getAllFirms().subscribe((res: any) => {
      this.firmsList = res;
    });
  }

  selectedFirmChange(changedFirm: any) {
    console.log(changedFirm);
    let firm_id: number[] = [];

    if (changedFirm.length) {
      changedFirm.forEach((firm: any) => {
        firm_id.push(firm.id);
      });

      this.clauseList = [];
      this.librarySer.getFirmFilteredClause(firm_id).subscribe((res: any) => {
        this.clauseList = res;
      });
    } else {
      this.createClauseList(this.selectedVal.name);
    }
  }

  createClauseList(selectedVal: string) {
    // this.clauseList = [];
    let requestUrl = '';

    if (selectedVal == 'My Clauses') {
      //   if (clause.type == null && clause.firm == null)
      requestUrl = 'type__isnull=true&firm__isnull=true';
      this.getClauseList(requestUrl);
    } else if (selectedVal == 'Firm Clauses') {
      //   if (clause.type == null && clause.firm != null)
      requestUrl = 'firm__isnull=false';
      this.getClauseList(requestUrl);
    } else if (selectedVal == 'Training Clauses') {
      //   if (clause.type == 'training')
      requestUrl = 'type=training';
      this.getClauseList(requestUrl);
    } else {
      //   if (clause.type == 'global')
      requestUrl = 'type=global';
      this.getClauseList(requestUrl);
    }
  }

  getClauseList(requestUrl: string) {
    this.clauseList = [];
    this.isClauseListLoading = true;
    this.librarySer.getFilteredClause(requestUrl).subscribe((res: any) => {
      this.clauseList = res;
      this.isClauseListLoading = false;
    });
  }

  addNewClause(): void {
    const modal = this.modalSer.create({
      nzTitle: 'Create Clause',
      nzContent: CreateClauseComponent,
      nzCancelText: null,
      nzOkText: null,
      nzComponentParams: {
        selectedType: this.selectedVal,
        firmsList: this.firmsList,
      },
    });

    modal.afterClose.subscribe((res: any) => {
      if (res) {
        this.clauseList.unshift(res.clause);
      }
    });
  }

  updateClauseList(res: any) {
    if (res.type == 'edit') {
      this.clauseList[res.clauseInd] = res.clause;
    } else if (res.type == 'delete') {
      this.clauseList.splice(res.clauseInd, 1);
    }
  }
}
