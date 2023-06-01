import { Component, OnInit } from '@angular/core';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DisputeStatus } from 'src/app/shared/enums/dispute-status.enum';
import { AmountUtil } from 'src/app/shared/utils/amount';
import { OffersService } from 'src/app/shared/services/offers.service';
import { Offer } from 'src/app/shared/interfaces/offer';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Router } from '@angular/router';
@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dispute: any;
  disputeStatus!: string;

  amountUtil = AmountUtil;

  constructor(
    public authRoleService: AuthRoleService,
    private offerService: OffersService,
    private alertModalService: AlertModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authRoleService.dispute$
      .pipe(untilDestroyed(this))
      .subscribe((dispute) => {
        if (dispute) {
          this.dispute = dispute;
          this.disputeStatus =
            DisputeStatus[dispute.status as keyof typeof DisputeStatus];
          this.renderAlertModal(dispute);
        }
      });
  }

  renderAlertModal = (dispute: any) => {
    this.offerService
      .getOffersAgainstClaimId(dispute.claim.id, dispute.respondent?.id)
      .subscribe((offers: Offer[]) => {
        const latestOffer = offers[offers?.length - 1];
        // this.testUpdateOffer(latestOffer.id);
        if (
          !latestOffer.offer_received_modal_rendered &&
          this.authRoleService.userType == 'claimer'
        ) {
          this.alertModalService
            .info(
              'New Offer Recieved!',
              'Respondent has made a new offer on this dispute.',
              'Take Action'
            )
            .then((res) => {
              if (res.isConfirmed) {
                this.offerService
                  .updateOffer(latestOffer.id, {
                    offer_received_modal_rendered: true,
                  })
                  .subscribe();
                this.router.navigate([
                  `/dispute/${this.dispute.id}/claimer/actions`,
                ]);
              }
            });
        } else if (
          !latestOffer.offer_accepted_modal_rendered &&
          this.authRoleService.userType == 'respondent' &&
          latestOffer.status != 'pending'
        ) {
          this.alertModalService
            .alert(
              latestOffer.status == 'accepted'
                ? 'Offer Accepted!'
                : 'Offer Rejected!',
              latestOffer.status == 'accepted'
                ? 'Your offer has been accepted by the claimer.'
                : 'Your offer has rejected by the claimer.',
              latestOffer.status == 'accepted' ? 'success' : 'error',
              'View Details'
            )
            .then((res) => {
              this.offerService
                .updateOffer(latestOffer.id, {
                  offer_accepted_modal_rendered: true,
                })
                .subscribe();
              if (res.isConfirmed) {
                this.router.navigate([
                  `/dispute/${this.dispute.id}/claimer/summary`,
                ]);
              }
            });
        }
      });
  };

  // For testing purpose
  testUpdateOffer = (offerId: number) => {
    this.offerService
      .updateOffer(offerId, {
        offer_received_modal_rendered: false,
        offer_accepted_modal_rendered: false,
      })
      .subscribe();
  };
}
