import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ArbitratorLibraryService } from '../../shared/arbitrator-library.service';

@Component({
  selector: 'app-newfolder-modal',
  templateUrl: './newfolder-modal.component.html',
  styleUrls: ['./newfolder-modal.component.scss'],
})
export class NewfolderModalComponent implements OnInit {
  type = 'new';
  content = 'folder';
  node: any;
  relation: string = 'root';
  firmId!: number[];
  selectedVal!: { id: number; name: string };
  inputValue = '';

  constructor(
    private modal: NzModalRef,
    private librarySer: ArbitratorLibraryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.type == 'edit') {
      this.inputValue = this.node.title;
    }
  }

  handleOk(): void {
    if (this.content == 'folder') {
      if (this.type == 'new') {
        let requestBody: any = {
          name: this.inputValue,
          relation: 'root',
          sequence: 0,
        };

        if (this.relation == 'child') {
          requestBody.relation = 'child';
          requestBody['parent'] = this.node.key;
        }

        if (this.selectedVal.name == 'My Files') {
          requestBody['type'] = null;
          requestBody['firm'] = null;
        } else if (this.selectedVal.name == 'Firm Files') {
          requestBody['firm'] = this.firmId.join(',');
        } else if (this.selectedVal.name == 'Training Files') {
          requestBody['type'] = 'training';
        } else {
          requestBody['type'] = 'global';
        }

        this.librarySer.createFolder(requestBody).subscribe(() => {
          this.notificationService.success('Folder Created!');
          this.modal.close(true);
        });
      } else if (this.type == 'edit') {
        this.librarySer
          .renameFolder(this.node.key, { name: this.inputValue })
          .subscribe((res: any) => {
            this.notificationService.success('Folder Renamed.');
            this.modal.close({
              id: this.node.key,
              type: 'edit',
              name: res.name,
              relation: this.relation,
            });
          });
      }
    } else if (this.content == 'file') {
      const formData = new FormData();
      formData.append('name', this.inputValue);

      this.librarySer.renameFile(this.node.key, formData).subscribe(() => {
        this.notificationService.success('File Renamed.');
        this.modal.close(true);
      });
    }
  }

  handleCancel(): void {
    this.inputValue = '';

    this.modal.destroy();
  }
}
