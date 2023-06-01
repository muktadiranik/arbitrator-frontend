import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddChecklistItemComponent } from './components/add-checklist-item/add-checklist-item.component';
import { ArbitratorLibraryService } from 'src/app/views/pages/arbitrator/shared/arbitrator-library/shared/arbitrator-library.service';
import { forkJoin } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'termsheet-checklist',
  templateUrl: './termsheet-checklist.component.html',
  styleUrls: ['./termsheet-checklist.component.scss'],
})
export class TermsheetChecklistComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  checklistItems: any[] = [];
  categoryChecklists: any[] = [];
  selectedNode: any;
  selectedChecklist: any;

  constructor(
    private modalService: NzModalService,
    private notificationService: NotificationService,
    private libraryService: ArbitratorLibraryService
  ) {}

  ngOnInit(): void {
    forkJoin({
      categories: this.libraryService.getAllChecklistCategories(),
      checklist: this.libraryService.getAllChecklist(),
    }).subscribe((res: any) => {
      let categories = [{ id: null, name: 'Uncategorized' }, ...res.categories];

      let checklists = res.checklist;

      this.categoryChecklists = [];
      categories.forEach((category: any, index: number) => {
        this.categoryChecklists.push({
          title: category.name,
          key: index + category.name,
          children: checklists.filter((checklist: any) => {
            if (checklist.category) {
              return checklist.category.name == category.name;
            } else {
              return checklist.cateogry == null && category.id == null;
            }
          }),
        });
      });

      //setting the data in nz-tree format
      this.categoryChecklists.forEach((checklist: any) => {
        checklist.children.forEach((c: any, i: number) => {
          checklist.children[i] = {
            key: c.id,
            title: c.name,
            data: c,
            isLeaf: true,
          };
        });
      });
    });
  }

  addChecklistItem(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add Checklist Item',
      nzContent: AddChecklistItemComponent,
      nzFooter: null,
      nzComponentParams: {
        checklist: this.selectedChecklist,
      },
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
        this.selectedChecklist.termsheet_items.unshift(res[0]);
      }
    });
  }

  editChecklistItem(item: any, index: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Checklist Item',
      nzContent: AddChecklistItemComponent,
      nzFooter: null,
      nzComponentParams: {
        checklist: this.selectedChecklist,
        item: item,
        checklistType: 'termsheet-checklist-items',
      },
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
        this.selectedChecklist.termsheet_items[index] = res;
      }
    });
  }

  deleteChecklistItem(item: any, index: number): void {
    this.libraryService.deleteTermsheetChecklistItem(item.id).subscribe(() => {
      this.notificationService.success('Checklist item deleted.');

      this.selectedChecklist.termsheet_items.splice(index, 1);
    });
  }

  categoryChecklistChange(checklist: any): void {
    let selectedNode: any;
    this.categoryChecklists.forEach((ck: any) => {
      ck.children.forEach((c: any) => {
        if (c.data.id == checklist) selectedNode = c.data;
      });
    });

    if (selectedNode) this.selectedChecklist = selectedNode;
    else {
      selectedNode = undefined;
      this.selectedChecklist = undefined;
    }
  }

  toggleItem(item: any): void {
    this.libraryService
      .toggleTermsheetChecklistItem(item.id, { checked: item.checked })
      .subscribe({
        error: () => {
          this.notificationService.error('Error occured.');
          item.checked = !item.checked;
        },
      });
  }

  closeDrawer(): void {
    this.visible = false;
    this.close.emit(false);
  }
}
