import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Output() addNewItem = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  addNew() {
    this.addNewItem.emit();
  }
}
