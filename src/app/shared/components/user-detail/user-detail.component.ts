import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  @Input() align: string = '';
  @Input() userType: string = '';
  @Input() typeClass: string = '';
  @Input() nameClass: string = '';
  @Input() userName: string = '';
  @Input() emailClass: string = '';
  @Input() userEmail: string = '';

  constructor() {}

  ngOnInit(): void {}
}
