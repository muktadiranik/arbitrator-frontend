import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';
import { ArbitratorLibraryService } from '../../shared/arbitrator-library.service';

let iconSize = 18;
@Component({
  selector: 'app-tree-v2',
  templateUrl: './tree-v2.component.html',
  styleUrls: ['./tree-v2.component.scss'],
})
export class TreeV2Component implements OnInit {
  @ViewChild('editInput') editInput!: ElementRef;
  @Input() folderList!: any[];
  @Input() firm_id!: any[];
  @Input() selectedVal!: { id: number; name: string };

  @Output() selectionChange = new EventEmitter<any>();

  inputValue: any = null;
  folderColor = '#2fc405';
  fileColor = '#0077b6';
  requestBody: any;
  iconSize: number = iconSize;

  private transformer = (node: any, level: number): any => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.id === node.id
        ? existingNode
        : {
            expandable:
              (!!node.folders && node.folders.length > 0) ||
              (!!node.files && node.files.length > 0),
            name: node.name,
            extension: node.extension,
            level,
            id: node.id,
            edit: !!node?.edit,
            size: node.extension ? node.size : '',
            fileUrl: node.extension ? node.fileUrl : '',
          };
    flatNode.name = node.name;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeData = this.folderList;
  flatNodeMap = new Map<any, any>();
  nestedNodeMap = new Map<any, any>();
  selectListSelection = new SelectionModel<any>(); //true for multi selection

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => [...node.folders, ...node.files]
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
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
    this.treeData = this.folderList;

    this.dataSource.setData(this.treeData);
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: any): boolean => node.expandable;
  hasNoContent = (_: number, node: any): boolean => node.name == '';

  getNode(name: string): any | null {
    return this.treeControl.dataNodes.find((n) => n.name === name) || null;
  }

  get isValid() {
    return this.inputValue == null || this.inputValue.length > 1;
  }

  downloadFile(node: any): void {
    window.open(node.fileUrl);
  }

  delete(node: any): void {
    console.log(node);
    if (node.extension) {
      this.librarySer.deleteFile(node.id).subscribe(() => {
        this.notificationService.success(`"${node.name}" Deleted!`);

        this.generateTree(node);
      });
    } else {
      this.librarySer.deleteFolder(node.id).subscribe(() => {
        this.notificationService.success(`"${node.name}" Deleted!`);

        this.generateTree(node);
      });
    }
  }

  cancel() {}

  generateTree(node: any) {
    this.inputValue = null;
    const originNode = this.flatNodeMap.get(node);
    const dfsParentNode = (): any | null => {
      const stack = [...this.treeData];
      while (stack.length > 0) {
        const n = stack.pop()!;
        if (n.folders) {
          if (n.folders.find((e: any) => e === originNode)) {
            return n;
          }

          for (let i = n.folders.length - 1; i >= 0; i--) {
            stack.push(n.folders[i]);
          }
        }

        if (n.files) {
          if (n.files.find((e: any) => e === originNode)) {
            return n;
          }

          for (let i = n.files.length - 1; i >= 0; i--) {
            stack.push(n.files[i]);
          }
        }
      }
      return null;
    };

    const parentNode = dfsParentNode();
    if (parentNode && parentNode.folders) {
      parentNode.folders = parentNode.folders.filter(
        (e: any) => e !== originNode
      );
      parentNode.files = parentNode.files.filter((e: any) => e !== originNode);
    } else {
      this.treeData = this.treeData.filter((e: any) => e.id !== originNode.id);
    }
    this.dataSource.setData(this.treeData);
  }

  onEnter(node: any, value: string) {
    if (this.isValid) {
      this.saveNode(node, value);
    }
  }

  saveNode(node: any, value: string): void {
    console.log(node);
    this.inputValue = value;
    const nestedNode = this.flatNodeMap.get(node);
    if (nestedNode) {
      this.requestBody['name'] = value;
      console.log(this.requestBody);
      this.librarySer.createFolder(this.requestBody).subscribe((res: any) => {
        this.notificationService.success('Folder Created!');
        nestedNode.expandable = true;
        nestedNode.name = res.name;
        nestedNode.id = res.id;
        nestedNode.folders = nestedNode.folders || [];
        nestedNode.files = nestedNode.files || [];
        this.dataSource.setData(this.treeData);
        this.inputValue = null;
        // this.treeControl.expand(node);
      });
    }
  }

  addNewFile(node: any) {
    console.log(node);
    document.getElementById(node.id)?.click();
  }

  onChange(event: any, node: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file,
      });
    }

    let file = this.form.get('fileSource')?.value || '';

    console.log(node);
    const parentNode = this.flatNodeMap.get(node);
    console.log(parentNode);
    if (file != '') {
      const formData = new FormData();
      formData.append('folder', parentNode.id);
      formData.append('sequence', JSON.stringify(0));
      formData.append('file', file);

      this.librarySer.uploadFile(formData).subscribe((res: any) => {
        this.notificationService.success('File Uploaded!');
        node.expandable = true;
        node.size = res.size;
        node.fileUrl = res.fileUrl;
        parentNode.folders.push(res);
        parentNode.expandable = true;
        this.dataSource.setData(this.treeData);
        this.treeControl.expand(node);
        // this.addNewNode(node);
      });
    }
  }

  cancelNewNode(node: any) {
    console.log(node);
    if (node.name == '' && node.id == 'new') {
      this.treeData.shift();
      this.inputValue = null;
    } else {
      const parentNode = this.flatNodeMap.get(node);
      console.log(parentNode);
      console.log(this.treeData);
      this.treeData.forEach((data: any) => {
        let node = data.folders.filter(
          (folder: any) => folder.name == parentNode.name
        );
        if (node.length) {
          data.folders.pop();
          this.inputValue = null;
          return;
        }
      });
    }
    // else {
    //   const parentNode = this.flatNodeMap.get(node);
    //   if (parentNode) {
    //     node.expandable = true;
    //     parentNode.folders = parentNode.folders || [];
    //     parentNode.files = parentNode.files || [];
    //     parentNode.folders.push({
    //       name: '',
    //       id: `${parentNode.id}-${parentNode.folders.length}`,
    //     });
    //   }
    // }

    this.dataSource.setData(this.treeData);
    this.treeControl.expand(node);
  }

  addNewNode(node: any) {
    let paramsObj: any = {};

    if (this.inputValue == null) {
      this.inputValue = '';
    } else if (this.inputValue != null) {
      console.log('Input value has some value', this.inputValue);

      return;
    }

    if (node == undefined) {
      paramsObj['relation'] = 'root';
      if (this.selectedVal.name == 'Firm Files') {
        if (this.firm_id.length) {
          paramsObj['firmId'] = this.firm_id;

          this.addSingleNode();
          this.createPayload(paramsObj);
        } else {
          this.notificationService.error('Select Firm First!');
        }
      } else {
        this.addSingleNode();
        this.createPayload(paramsObj);
      }
    } else {
      paramsObj['relation'] = 'child';
      paramsObj['node'] = node;
      this.createPayload(paramsObj);
      const parentNode = this.flatNodeMap.get(node);
      if (parentNode) {
        node.expandable = true;
        parentNode.folders = parentNode.folders || [];
        parentNode.files = parentNode.files || [];
        parentNode.folders.push({
          name: '',
          id: `${parentNode.id}-${parentNode.folders.length}`,
        });
      }
    }

    this.dataSource.setData(this.treeData);
    this.treeControl.expand(node);
  }

  createPayload(paramsObj: any) {
    this.requestBody = {
      name: this.inputValue,
      relation: paramsObj.relation,
      sequence: 0,
    };

    if (paramsObj.relation == 'child') {
      this.requestBody['parent'] = paramsObj.node.id;
    }

    if (this.selectedVal.name == 'My Files') {
      this.requestBody['type'] = null;
      this.requestBody['firm'] = null;
    } else if (this.selectedVal.name == 'Firm Files') {
      this.requestBody['firm'] = this.firm_id.join(',');
    } else if (this.selectedVal.name == 'Training Files') {
      this.requestBody['type'] = 'training';
    } else {
      this.requestBody['type'] = 'global';
    }
  }

  addSingleNode() {
    this.treeData.unshift({
      name: '',
      id: 'new',
    });
  }

  toggleEdit(node: any) {
    node.edit = !node.edit;

    setTimeout(() => {
      if (node.edit) {
        this.editInput.nativeElement?.focus();
      }
    }, 200);
  }

  saveEdit(node: any, value: string) {
    node.edit = false;
    if (value.length) {
      this.librarySer.renameFolder(node.id, { name: value }).subscribe(() => {
        node.name = value;
        this.notificationService.success('Folder Renamed.');
      });
    } else {
      this.notificationService.error('Please enter valid name!');
    }
  }

  get isSelected() {
    return !!this.selectListSelection.selected.length;
  }
  get selectedNode() {
    return this.selectListSelection.selected[0];
  }

  get isFile() {
    return !!this.selectedNode?.extension;
  }
}
