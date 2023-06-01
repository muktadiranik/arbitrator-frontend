import { Component, OnInit, Input } from '@angular/core';
import { AuthRoleService } from '../../services/auth-role.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() actor!: any;
  constructor(public authRoleService: AuthRoleService) {}

  ngOnInit(): void {}
}
