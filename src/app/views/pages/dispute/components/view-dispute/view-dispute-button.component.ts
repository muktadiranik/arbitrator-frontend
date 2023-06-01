import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/auth';
import { Dispute } from 'src/app/shared/interfaces/dispute';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DisputeTabsService } from '../../dispute-base/dispute-tabs.service';

@Component({
  selector: 'view-dispute-button',
  templateUrl: './view-dispute-button.component.html',
  styleUrls: ['./view-dispute-button.component.scss'],
})
export class ViewDisputeButtonComponent implements OnInit {
  @Input() dispute!: Dispute;

  constructor(
    private router: Router,
    public authRoleService: AuthRoleService,
    private notificationService: NotificationService,
    private disputeTabs: DisputeTabsService
  ) {}

  ngOnInit(): void {}

  disputeDetails(dispute: any) {
    this.authRoleService.getCurrentUser().subscribe((user: User) => {
      if (dispute.claimer == null && dispute.respondent == null) {
        this.notificationService.error('Claimer and Respondent not found.');
      } else if (dispute.claimer == null) {
        this.notificationService.error('Claimer not found.');
      } else {
        this.authRoleService.dispute = dispute;
        this.router.navigate([
          'dispute',
          dispute.id,
          ...this.disputeTabs
            .getTab(this.authRoleService.getActorDisputeHome(user.actor.type))
            .path.split('/'),
        ]);
      }
    });
  }
}
