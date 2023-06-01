import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ArbitratorLibraryService } from '../shared/arbitrator-library.service';

export interface Node {
  title: string;
  key: string;
  expanded: boolean;
  children: { title: string; key: string; icon?: string; isLeaf: boolean }[];
}

@Component({
  selector: 'app-library-document',
  templateUrl: './library-document.component.html',
  styleUrls: ['./library-document.component.scss'],
})
export class LibraryDocumentComponent implements OnInit {
  enable = false;
  activatedNode: any;
  activatedFile: any;
  selectedVal!: { id: number; name: string };

  folderList: any[] = [];

  optionList = [
    { id: 1, name: 'My Files' },
    { id: 2, name: 'Project Name' },
    { id: 3, name: 'Firm Files' },
    { id: 4, name: 'Training Files' },
  ];

  isActionButton: boolean = false;
  showFileButton: boolean = false;
  requestUrl = '';
  firmsList: any[] = [];
  firm_id: number[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalSer: NzModalService,
    private librarySer: ArbitratorLibraryService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      firm: [[]],

      file: new FormControl(''),
      fileSource: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllFolders();
  }

  getAllFolders(type?: any) {
    let selectedType = type ? type : this.optionList[0];

    let selectedFirm = this.form.get('firm')?.value;
    if (selectedType.name == 'Firm Files' && selectedFirm.length) {
      this.selectedFirmChange(selectedFirm);
    } else {
      this.selectedValueChange(selectedType);
    }
  }

  selectedValueChange(selectedVal: { id: number; name: string }) {
    this.isActionButton = false;

    this.selectedVal = selectedVal;
    this.createFolderList(this.selectedVal.name);
    this.firmsList = [];

    if (this.selectedVal.name == 'Firm Files') {
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
    this.firm_id = [];

    if (changedFirm.length) {
      changedFirm.forEach((firm: any) => {
        this.firm_id.push(firm.id);
      });

      this.enable = false;
      this.librarySer
        .getFirmFilteredFolder(this.firm_id)
        .subscribe((res: any) => {
          this.folderList = [];
          this.folderList = res;
          this.enable = true;
          // this.createFileTreeStructure();
        });
    } else {
      this.createFolderList(this.selectedVal.name);
    }
  }

  createFolderList(selectedVal: string) {
    this.folderList = [];

    if (selectedVal == 'My Files') {
      //   if (type == null && firm == null)
      this.requestUrl = 'type__isnull=true&firm__isnull=true';
      this.getFolderList(this.requestUrl);
    } else if (selectedVal == 'Firm Files') {
      //   if (type == null && firm != null)
      this.requestUrl = 'firm__isnull=false';
      this.getFolderList(this.requestUrl);
    } else if (selectedVal == 'Training Files') {
      //   if (type == 'training')
      this.requestUrl = 'type=training';
      this.getFolderList(this.requestUrl);
    } else {
      //   if (type == 'global')
      this.requestUrl = 'type=global';
      this.getFolderList(this.requestUrl);
    }
  }

  getFolderList(requestUrl: string) {
    this.enable = false;
    this.librarySer.getFilteredFolder(requestUrl).subscribe((res: any) => {
      this.folderList = res;
      this.enable = true;
      // this.createFileTreeStructure();
    });
  }

  treeSelectionChange(data: any) {
    console.log(data);
    this.isActionButton = data.status;
    this.activatedNode = data.status ? data.node : undefined;
    this.activatedFile = !data.status ? data.node : undefined;
    this.showFileButton = false;

    if (data.node.origin.extraData.file) {
      this.showFileButton = true;
    }
  }

  // createFileTreeStructure() {
  //   let tempList: any[] = [];
  //   this.folderList.forEach((folder: any) => {
  //     tempList.push({
  //       title: folder.name,
  //       key: folder.id,
  //       children: [...folder.folders, ...folder.files],
  //       extraData: folder,
  //     });
  //   });
  //   this.folderList = [];
  //   this.folderList = tempList;

  //   tempList = [];
  //   this.folderList.forEach((folder: any) => {
  //     if (folder.children.length) {
  //       folder.children.forEach((childFolder: any) => {
  //         if (childFolder.file) {
  //           //meaning its a file
  //           tempList.push({
  //             title: childFolder.name,
  //             key: childFolder.id,
  //             isLeaf: true,
  //             extraData: childFolder,
  //           });
  //         } else {
  //           //meaning its a folder
  //           tempList.push({
  //             title: childFolder.name,
  //             key: childFolder.id,
  //             extraData: childFolder,
  //           });
  //         }
  //       });

  //       folder.children = [];
  //       folder.children = tempList;
  //       tempList = [];
  //     }
  //   });

  //   console.log(this.folderList);
  // }

  // addNewFolder() {
  //   let paramsObj: any = {};
  //   //checking if creating sub-folder or root folder
  //   if (this.activatedNode) {
  //     //node selected, meaing sub-folder creation
  //     paramsObj['relation'] = 'child';
  //     paramsObj['node'] = this.activatedNode;
  //   }

  //   if (this.selectedVal.name == 'Firm Files') {
  //     if (this.firm_id.length) {
  //       paramsObj['type'] = 'new';
  //       paramsObj['selectedVal'] = this.selectedVal;
  //       paramsObj['firmId'] = this.firm_id;

  //       this.createModal(paramsObj);
  //     } else {
  //       this.notificationService.error('Select Firm First!');
  //     }
  //   } else {
  //     paramsObj['type'] = 'new';
  //     paramsObj['selectedVal'] = this.selectedVal;

  //     this.createModal(paramsObj);
  //   }
  // }

  // createModal(paramsObj: {}) {
  //   const modal = this.modalSer.create({
  //     nzTitle: 'Create New Folder',
  //     nzOkText: null,
  //     nzCancelText: null,
  //     nzContent: NewfolderModalComponent,
  //     nzComponentParams: paramsObj,
  //   });

  //   modal.afterClose.subscribe((res) => {
  //     if (res) {
  //       this.getAllFolders(this.selectedVal);
  //     }
  //   });
  // }

  // renameFolder() {
  //   const modal = this.modalSer.create({
  //     nzTitle: 'Rename Folder',
  //     nzContent: NewfolderModalComponent,
  //     nzOkText: null,
  //     nzCancelText: null,
  //     nzComponentParams: {
  //       node: this.activatedNode,
  //       type: 'edit',
  //     },
  //   });

  //   modal.afterClose.subscribe((res: any) => {
  //     if (res && res.type == 'edit') {
  //       if (res.relation == 'root') {
  //         let index = this.folderList.findIndex(
  //           (x: any) => x.key == <string>this.activatedNode?.key
  //         );

  //         let tempNodes = JSON.parse(JSON.stringify(this.folderList));
  //         this.folderList = [];
  //         tempNodes[index].title = res.name;
  //         console.log(tempNodes);
  //         tempNodes.forEach((node: any) => {
  //           this.folderList.push(node);
  //         });
  //       }
  //     }
  //   });
  // }

  // deleteFolder() {
  //   Swal.fire({
  //     title: 'Do you want to delete this folder?',
  //     showDenyButton: true,
  //     confirmButtonText: 'Delete',
  //     cancelButtonText: 'No',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.librarySer.deleteFolder(this.activatedNode.key).subscribe(() => {
  //         this.notificationService.success(`"${this.activatedNode.title}" Deleted!`);

  //         let tempNodes: any[] = JSON.parse(JSON.stringify(this.folderList));
  //         this.folderList = [];
  //         let index = tempNodes.findIndex(
  //           (x: any) => x.key == <string>this.activatedNode?.key
  //         );

  //         tempNodes.splice(index, 1);
  //         tempNodes.forEach((node: any) => {
  //           this.folderList.push(node);
  //         });
  //       });
  //     }
  //   });
  // }

  // uploadFile() {
  //   document.getElementById('input')?.click();
  // }

  // onChange(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     const file = event.target.files[0];
  //     this.form.patchValue({
  //       fileSource: file,
  //     });
  //   }

  //   let file = this.form.get('fileSource')?.value || '';

  //   console.log(this.activatedNode);

  //   if (file != '') {
  //     const formData = new FormData();
  //     formData.append('folder', this.activatedNode.key);
  //     formData.append('sequence', JSON.stringify(0));
  //     formData.append('file', file);

  //     this.librarySer.uploadFile(formData).subscribe(() => {
  //       this.notificationService.success('File Uploaded!');
  //       this.getAllFolders(this.selectedVal);
  //     });
  //   }
  // }

  // deleteFile() {
  //   console.log(this.activatedFile);
  //   Swal.fire({
  //     title: 'Do you want to delete this file?',
  //     showDenyButton: true,
  //     confirmButtonText: 'Delete',
  //     cancelButtonText: 'No',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.librarySer.deleteFile(this.activatedFile.key).subscribe(() => {
  //         this.notificationService.success(`"${this.activatedFile.title}" Deleted!`);
  //         this.getAllFolders(this.selectedVal);
  //       });
  //     }
  //   });
  // }

  // renameFile() {
  //   const modal = this.modalSer.create({
  //     nzTitle: 'Rename File',
  //     nzContent: NewfolderModalComponent,
  //     nzOkText: null,
  //     nzCancelText: null,
  //     nzComponentParams: {
  //       node: this.activatedFile,
  //       type: 'edit',
  //       content: 'file',
  //     },
  //   });

  //   modal.afterClose.subscribe((res) => {
  //     if (res) {
  //       this.getAllFolders(this.selectedVal);
  //     }
  //   });
  // }

  // downloadFile() {
  //   let url = this.activatedFile.origin.extraData.file;
  //   window.open(url);
  // }
}
