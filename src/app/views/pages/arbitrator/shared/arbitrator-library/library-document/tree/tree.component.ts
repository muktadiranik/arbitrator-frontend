import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @Input() itemList: any[] = [];
  @Output() selectionChange = new EventEmitter<any>();

  activatedNode?: NzTreeNode;

  constructor(private nzContextMenuService: NzContextMenuService) {}

  ngOnInit(): void {}

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node!;
    // console.log(this.activatedNode);
    this.selectionChange.emit({
      node: this.activatedNode,
      status: !data.node?.isExpanded && !data.node?.isLeaf,
    });
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }
}
