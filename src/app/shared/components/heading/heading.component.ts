import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent implements OnInit {
  constructor() {}
  @Input() h1: string = '';
  @Input() h3: string = '';
  @Input() h2!: TemplateRef<any>;
  ngOnInit(): void {}

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
