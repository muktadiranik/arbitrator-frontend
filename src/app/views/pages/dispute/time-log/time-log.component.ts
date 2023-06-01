import { Component, OnInit } from '@angular/core';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';

@Component({
  selector: 'app-time-log',
  templateUrl: './time-log.component.html',
  styleUrls: ['./time-log.component.scss'],
})
export class TimeLogComponent implements OnInit {
  dispute: any;
  constructor(public authRoleService: AuthRoleService) {}

  ngOnInit(): void {
    this.authRoleService.dispute$.subscribe(
      (dispute) => (this.dispute = dispute)
    );
  }
}
