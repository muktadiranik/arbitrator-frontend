import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ArbitratorLibraryService } from '../../shared/arbitrator-library.service';
import { CreateClauseComponent } from '../create-clause/create-clause.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-clause-list',
  templateUrl: './clause-list.component.html',
  styleUrls: ['./clause-list.component.scss'],
})
export class ClauseListComponent implements OnInit {
  @Input() isClauseListLoading: boolean = true;

  @Input() selectedValue!: { id: number; name: string };
  @Input() clauseList: any[] = [];
  @Input() firmsList: any[] = [];
  @Output() clauseListUpdated = new EventEmitter<any>();

  loading: boolean = false;

  constructor(
    private message: NzMessageService,
    private modalSer: NzModalService,
    private librarySer: ArbitratorLibraryService
  ) {}

  ngOnInit(): void {}

  action(type: string, clause: any, index: number): void {
    switch (type) {
      case 'copy':
        this.copyClause(clause);
        break;

      case 'edit':
        this.editClause(clause, index);
        break;

      case 'delete':
        this.deleteClause(clause, index);
        break;
    }
  }

  copyClause(clause: any) {
    console.log(clause);
    this.message.create('success', 'Clause Copied!');
  }

  editClause(clause: any, index: number) {
    console.log(clause);

    if (clause.firm && !clause.firm.name) {
      this.loading = true;
      this.librarySer
        .getFirm(clause.firm)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((firm: any) => {
          clause.firm = firm;
          this.openEditModal(clause, index);
        });
    } else {
      this.openEditModal(clause, index);
    }
  }

  openEditModal(clause: any, index: number): void {
    const modal = this.modalSer.create({
      nzTitle: 'Edit clause',
      nzContent: CreateClauseComponent,
      nzOkText: null,
      nzCancelText: null,
      nzComponentParams: {
        selectedType: this.selectedValue,
        clause: clause,
        firmsList: this.firmsList,
        type: 'edit',
      },
    });

    modal.afterClose.subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.clauseListUpdated.emit({
          type: 'edit',
          clause: res.clause,
          clauseInd: index,
        });
      }
    });
  }

  deleteClause(clause: any, index: number) {
    this.librarySer.deleteClause(clause.id).subscribe(() => {
      this.message.create('success', 'Clause Deleted!');
      this.clauseListUpdated.emit({
        type: 'delete',
        clause: clause,
        clauseInd: index,
      });
    });
  }
}
