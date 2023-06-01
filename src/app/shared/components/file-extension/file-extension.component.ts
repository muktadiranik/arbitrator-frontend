import { Component, Input } from '@angular/core';
import { Evidence } from '../../interfaces/evidence';
import { File } from '../../interfaces/file';

@Component({
  selector: 'file-extension',
  templateUrl: './file-extension.component.html',
  styleUrls: ['./file-extension.component.scss'],
})
export class FileExtensionComponent {
  @Input() file!: File | Evidence;
}
