import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ArbitratorLibraryService } from '../../shared/arbitrator-library.service';
import { finalize } from 'rxjs';
import { AddChecklistItemComponent } from 'src/app/views/pages/dispute/term-sheet/components/termsheet-checklist/components/add-checklist-item/add-checklist-item.component';
import { YyyyMmDdPipe } from 'src/app/shared/pipes/date/yyyy-mm-dd/yyyy-mm-dd.pipe';

@Component({
  selector: 'app-create-checklist',
  templateUrl: './create-checklist.component.html',
  styleUrls: ['./create-checklist.component.scss'],
})
export class CreateChecklistComponent implements OnInit {
  @Input() selectedType!: { id: number; name: string };
  @Input() firmsList: any[] = [];
  @Input() checklist: any;
  // @Input() type: any = 'create';

  @ViewChild('inputElement') inputElement: any;

  categoryList: any[] = [];
  checkListForm: FormGroup;
  items!: FormArray;

  selectedFirm: any;
  // selectedFirm!: { id: number; name: string };
  // newCheckListId: number = -1;

  isButtonLoading = false;
  isCategoryLoading = false;
  itemUpdated = false;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private librarySer: ArbitratorLibraryService,
    private notificationService: NotificationService,
    private modalSer: NzModalService,
    private datePipe: YyyyMmDdPipe
  ) {
    this.checkListForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      firm: new FormControl(null),
      items: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.getChecklistCategory();

    if (this.checklist != undefined) {
      this.checkListForm.patchValue({
        name: this.checklist.name,
        description: this.checklist.description,
        category: this.checklist.category ? this.checklist.category.id : null,
        firm: this.checklist.firm ? this.checklist.firm : null,
      });

      this.items = this.checkListForm.get('items') as FormArray;
      this.checklist.items.forEach((item: any) => {
        this.items.push(this.fb.group(item));
      });

      this.items.push(this.createItem());
    }
  }

  addCategoryItem(): void {
    let requestBody = {
      name: this.inputElement.nativeElement.value,
    };

    this.librarySer
      .addChecklistCategoryItem(requestBody)
      .subscribe((category) => {
        this.categoryList.push(category);
        this.inputElement.nativeElement.value = '';
      });
  }

  getChecklistCategory(): void {
    this.isCategoryLoading = true;
    this.librarySer
      .getAllChecklistCategories()
      .pipe(
        finalize(() => {
          this.isCategoryLoading = false;
        })
      )
      .subscribe((res: any) => {
        this.categoryList = res;
      });
  }

  getValidity() {
    return (
      this.checkListForm.get('name')?.valid &&
      this.checkListForm.get('description')?.valid
    );
  }

  get checkListItem() {
    return this.checkListForm.get('items');
  }

  getItemsControls() {
    return (this.checkListForm.get('items') as FormArray).controls;
  }

  getItemsValidity() {
    return (
      this.checkListForm.get('items')?.valid &&
      this.checkListForm.get('name')?.valid &&
      this.checkListForm.get('description')?.valid
    );
  }

  firmControlValue(): { id: number; name: string } {
    return this.checkListForm.get('firm')?.value;
  }

  selectedFirmChange(changedFirm: any) {
    this.selectedFirm = changedFirm;
    this.checkListForm.get('firm')?.patchValue(changedFirm);
    this.checkListForm.get('firm')?.markAsDirty();
    this.checkListForm.get('firm')?.markAsTouched();
    this.checkListForm.get('firm')?.updateValueAndValidity();
  }

  createItem(): FormGroup {
    return this.fb.group({
      text: new FormControl('', Validators.required),
      sequence: 0,
      id: null,
      checklist: null,
      comments: null,
      initials: null,
      due_date: null,
    });
  }

  editChecklistItem(item: any, index: number): void {
    const modal = this.modalSer.create({
      nzTitle: 'Edit Checklist Item',
      nzContent: AddChecklistItemComponent,
      nzFooter: null,
      nzComponentParams: {
        item: item.value,
        checklistType: 'checklist-items',
      },
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
        this.checklist.items[index] = res;
        this.items.controls[index].setValue(res);
      }
    });
  }

  deleteChecklistItem(item: any, index: number) {
    this.librarySer.deleteChecklistItem(item.value.id).subscribe(() => {
      this.itemUpdated = true;

      this.getItemsControls().splice(index, 1);
      if (this.checklist) this.checklist.items.splice(index, 1);

      this.notificationService.success('Checklist Item Deleted.');
    });
  }

  addChecklistItem() {
    this.isButtonLoading = true;
    this.items = this.checkListForm.get('items') as FormArray;

    //checking if checklist has already added
    if (this.checklist) {
      let requestBody = {
        checklist: this.checklist.id,
        checklist_items: [
          {
            text: this.getItemsControls().at(this.items.length - 1)?.value.text,
            sequence: 0,
            due_date: this.datePipe.transform(new Date()),
          },
        ],
      };

      this.librarySer
        .addCheckListItem(requestBody)
        .pipe(finalize(() => (this.isButtonLoading = false)))
        .subscribe({
          next: (res: any) => {
            this.items.push(this.createItem());
            this.getItemsControls()
              .at(this.getItemsControls().length - 2)
              ?.setValue(res[0]);

            if (this.checklist) this.checklist.items.push(res[0]);

            this.itemUpdated = true;

            this.notificationService.success('Item Added.');
          },
        });
    } else {
      this.submitForm('modal-dontclose');
    }
  }

  createRequestBody(requestBody: any) {
    requestBody['sequence'] = 0;
    if (this.selectedType.name == 'My Checklist') {
      requestBody['type'] = null;
      requestBody['firm'] = null;
    } else if (this.selectedType.name == 'Training Checklist') {
      requestBody['type'] = 'training';
    } else if (this.selectedType.name == 'Firm Checklist') {
      requestBody['firm'] = this.selectedFirm
        ? this.selectedFirm.id
        : undefined;
    } else {
      requestBody['type'] = 'global';
    }
  }

  submitForm(state?: string) {
    if (this.checklist) {
      let requestBody: any = {};

      for (const key in this.checkListForm.controls) {
        if (this.checkListForm.controls[key].dirty) {
          requestBody[key] = this.checkListForm.controls[key].value;
        }
      }

      if ('items' in requestBody) delete requestBody['items'];
      if ('firm' in requestBody) requestBody['firm'] = requestBody['firm'].id;

      if (Object.keys(requestBody).length) {
        this.librarySer
          .editChecklist(requestBody, this.checklist.id)
          .subscribe((res: any) => {
            this.notificationService.success('Checklist Updated!');

            //adding category obj in the response, received only category id
            if (res.category) this.addCategoryObj(res);

            this.itemUpdated = true;

            if (state == undefined) {
              this.modal.close(res);
            }
          });
      } else {
        if (state == undefined) {
          this.modal.close(this.itemUpdated ? this.checklist : undefined);
        }
      }
    } else {
      let requestBody: any = {
        name: this.checkListForm.get('name')?.value,
        description: this.checkListForm.get('description')?.value,
        category: this.checkListForm.get('category')?.value,
      };
      this.createRequestBody(requestBody);

      this.librarySer
        .createChecklist(requestBody)
        .pipe(finalize(() => (this.isButtonLoading = false)))
        .subscribe({
          next: (res: any) => {
            this.notificationService.success('Checklist Created!');

            //adding category obj in the response, received only category id
            if (res.category) this.addCategoryObj(res);

            this.checklist = res;
            this.checkListForm.markAsUntouched();
            this.checkListForm.markAsPristine();
            this.checkListForm.updateValueAndValidity();
            // this.newCheckListId = res.id;
            if (this.items) this.items.push(this.createItem());

            this.itemUpdated = true;
            if (state == undefined) {
              this.modal.close(res);
            }
          },
        });
    }
  }

  addCategoryObj(response: any) {
    let index = this.categoryList.findIndex(
      (category) => category.id == response.category
    );
    response.category = {
      id: response.category,
      name: this.categoryList[index].name,
    };
  }

  destroyModal(): void {
    this.modal.close(this.itemUpdated ? this.checklist : undefined);
  }
}
