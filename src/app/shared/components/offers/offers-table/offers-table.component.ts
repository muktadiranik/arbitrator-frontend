import { Component, Input, OnInit } from '@angular/core';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { DateUtil } from 'src/app/shared/utils/date';

@Component({
  selector: 'offers-table',
  templateUrl: './offers-table.component.html',
  styleUrls: ['./offers-table.component.scss'],
})
export class OffersTableComponent implements OnInit {
  @Input() offers: any[] = [];

  dateUtil = DateUtil;

  constructor(public authRoleService: AuthRoleService) {}

  ngOnInit(): void {}
}
