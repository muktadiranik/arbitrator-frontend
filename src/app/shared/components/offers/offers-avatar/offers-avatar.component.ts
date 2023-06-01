import { Component, Input, OnInit } from '@angular/core';
import { OffersService } from 'src/app/shared/services/offers.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Claim, Dispute } from 'src/app/shared/interfaces/dispute';
import { Actor } from 'src/app/shared/interfaces/auth';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Offer } from 'src/app/shared/interfaces/offer';
import { OffersComponent } from '../offers/offers.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { AmountUtil } from 'src/app/shared/utils/amount';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
@UntilDestroy()
@Component({
  selector: 'offers-avatar',
  templateUrl: './offers-avatar.component.html',
  styleUrls: ['./offers-avatar.component.scss'],
})
export class OffersAvatarComponent implements OnInit {
  @Input() dispute!: Dispute;
  @Input() claim!: Claim;
  @Input() actor!: Actor;
  @Input() viewType: string = 'c';
  loading = false;
  offers!: Offer[];
  offer!: Offer;

  amountUtil = AmountUtil;

  constructor(
    private offerService: OffersService,
    private modalService: NzModalService,
    public authRoleService: AuthRoleService,
    private notificationService: NotificationService,
    private alertModalService: AlertModalService
  ) {}

  ngOnInit(): void {
    if (this.claim) {
      this.loading = true;
      this.offerService
        .getOffersAgainstClaimId(this.claim.id, this.dispute.respondent?.id)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (offers: Offer[]) => {
            this.offer = offers[offers?.length - 1];
            console.log(offers, this.offer);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  calculatePer(offerAmount: any, claimedAmount: any) {
    return Math.ceil((offerAmount / claimedAmount) * 100);
  }

  respondToOffer() {
    if (!this.claim) {
      this.notificationService.warning('No Offer Found!');
      return;
    }

    if (
      this.viewType == 'c' &&
      this.offer.status == 'pending' &&
      this.dispute.status != 'resolved'
    ) {
      //only claimer can see this offer details
      const modal = this.modalService.create({
        nzContent: OffersComponent,
        nzFooter: null,
        nzWidth: '1100px',
        nzComponentParams: {
          inputData: [],
          offer: this.offer,
          data: {
            offerAmount: this.offer.offered_amount,
            offerPercentage: this.calculatePer(
              this.offer.offered_amount,
              this.offer.claimed_amount
            ),
            offerHeading: 'Offers received',
            offerMsg:
              'Let us help you settle this dispute as soon as possible, you can accept or decline it to receive a new one.',
            status: 'Chance Of Success',
            reply: 'if you accept',
            showTable: false,
            type: 'none',
          },
        },
      });
      modal.afterClose.subscribe((status: any) => {
        if (status != undefined) {
          this.offer.status = status;
          if (status == 'accepted') {
            this.alertModalService.success(
              'Congratulations!',
              'You are one step away from dispute resolution.',
              'Dismiss'
            );
          }
        }
      });
    }
  }
}
