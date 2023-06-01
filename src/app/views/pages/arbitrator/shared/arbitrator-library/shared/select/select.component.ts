import {
  Attribute,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() optionList: any[] = [];
  @Input() selectedValue: any = { id: null };
  @Output() selectedValueChange = new EventEmitter<any>();

  nodes: any[] = [];

  constructor(@Attribute('placeholder') _placeholder: string) {
    this.placeholder = _placeholder;
  }

  ngOnInit(): void {
    this.selectionValueChange(this.selectedValue.id);
  }

  selectionValueChange(event: any) {
    this.nodes = [];
    this.selectedValue = this.optionList.filter(
      (option) => option.id == event
    )[0];

    this.selectedValueChange.emit(this.selectedValue);
  }
}
