import { Component, Input, OnInit } from '@angular/core';
import { Evidence } from '../../interfaces/evidence';
import { File } from '../../interfaces/file';
import { FileUtil } from '../../utils/file';

@Component({
  selector: 'file-size',
  templateUrl: './file-size.component.html',
  styleUrls: ['./file-size.component.scss'],
})
export class FileSizeComponent implements OnInit {
  @Input() file!: File | Evidence;

  fileUtil = FileUtil;

  constructor() {}

  ngOnInit(): void {}
}
