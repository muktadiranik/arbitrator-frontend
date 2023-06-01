import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ArbitratorLibraryService } from '../../shared/arbitrator-library.service';
import { summernoteConfig } from 'src/app/shared/configs/summernote';
import { SummerNote } from 'src/app/shared/interfaces/summernote';

@Component({
  selector: 'app-create-clause',
  templateUrl: './create-clause.component.html',
  styleUrls: ['./create-clause.component.scss'],
})
export class CreateClauseComponent implements OnInit {
  @Input() selectedType!: { id: number; name: string };
  @Input() clause: any;
  @Input() type: any;
  @Input() firmsList: any[] = [];

  @ViewChild('inputElement') inputElement: any;

  categoryList: any[] = [];
  selectedFirm!: { id: number; name: string };

  editorConfig!: SummerNote;

  clauseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private librarySer: ArbitratorLibraryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editorConfig = summernoteConfig;
    this.editorConfig.placeholder = 'Enter Clause';
    this.editorConfig.height = 200;

    this.clauseForm = this.fb.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      firm: new FormControl(null),
    });

    if (this.clause != undefined) {
      this.clauseForm.patchValue({
        title: this.clause.title,
        content: this.clause.content,
        category: this.clause.category.id,
        firm: this.clause.firm ? this.clause.firm : null,
      });
    }

    this.getAllCategories();
  }

  getAllCategories() {
    this.librarySer.getAllCategories().subscribe((res: any) => {
      this.categoryList = res;
    });
  }

  firmControlValue(): { id: number; name: string } {
    return this.clauseForm.get('firm')?.value;
  }

  addCategoryItem(): void {
    let requestBody = {
      name: this.inputElement.nativeElement.value,
    };

    this.librarySer.addCategoryItem(requestBody).subscribe(() => {
      this.getAllCategories();
      this.inputElement.nativeElement.value = '';
    });
  }

  selectedFirmChange(changedFirm: any) {
    this.selectedFirm = changedFirm;
    this.clauseForm.get('firm')?.patchValue(changedFirm);
    this.clauseForm.get('firm')?.markAsDirty();
    this.clauseForm.get('firm')?.markAsTouched();
    this.clauseForm.get('firm')?.updateValueAndValidity();
  }

  submitForm() {
    if (this.type == 'edit') {
      let requestBody: any = {};

      for (const key in this.clauseForm.controls) {
        if (this.clauseForm.controls[key].dirty) {
          requestBody[key] = this.clauseForm.controls[key].value;
        }
      }

      if ('firm' in requestBody) requestBody['firm'] = requestBody['firm'].id;

      if (Object.keys(requestBody).length) {
        this.librarySer
          .editClause(requestBody, this.clause.id)
          .subscribe((res: any) => {
            this.addCategoryName(res);
            this.notificationService.success('Clause Updated!');

            this.modal.close({ selectedVal: this.selectedType, clause: res });
          });
      } else {
        this.modal.close({
          selectedVal: this.selectedType,
          clause: this.clause,
        });
      }
    } else {
      let requestBody: any = {
        title: this.clauseForm.get('title')?.value,
        content: this.clauseForm.get('content')?.value,
        category: this.clauseForm.get('category')?.value,
        sequence: 0,
      };

      if (this.selectedType.name == 'My Clauses') {
        requestBody['type'] = null;
        requestBody['firm'] = null;
      } else if (this.selectedType.name == 'Training Clauses') {
        requestBody['type'] = 'training';
      } else if (this.selectedType.name == 'Firm Clauses') {
        requestBody['firm'] = this.selectedFirm
          ? this.selectedFirm.id
          : undefined;
      } else {
        requestBody['type'] = 'global';
      }

      this.librarySer.createClause(requestBody).subscribe((res: any) => {
        this.addCategoryName(res);
        this.notificationService.success('Clause Created!');

        this.modal.close({ selectedVal: this.selectedType, clause: res });
      });
    }
  }

  addCategoryName(response: any) {
    let selectedCategoryIndex: number = this.categoryList.findIndex(
      (category) => category.id == this.clauseForm.get('category')?.value
    );

    response.category = {
      id: response.category,
      name: this.categoryList[selectedCategoryIndex].name,
    };
  }

  destroyModal(): void {
    this.modal.destroy(undefined);
  }
}
