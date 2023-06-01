import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OffersService } from 'src/app/shared/services/offers.service';
import { RoundPercentage } from 'src/app/shared/utils/round-percentage.utils';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  @Input() inputData!: any[];
  @Input() offer!: any;
  @Input() data!: any;
  @Input() claimId!: any;
  amountClaimed = '';
  amountOffered = 0;
  per1: string | number = '';
  per2: string | number = '';
  loading = false;
  buttonLabel: string = '';
  constructor(
    private modal: NzModalRef,
    private offerSer: OffersService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.data.amountClaimed) {
      this.amountClaimed = this.data.amountClaimed.replace('$', '');
      this.per1 = this.calculatePer(80, this.amountClaimed);
      this.per2 = this.calculatePer(20, this.amountClaimed);
    }
  }

  calculatePer(partialValue: any, totalValue: any) {
    return RoundPercentage.Round((totalValue * partialValue) / 100);
  }

  makeOffer(val?: any) {
    if (val) {
      this.amountOffered = val;
    }

    if (this.amountOffered > 0) {
      let requestBody = {
        offered_amount: this.amountOffered,
        status: 'pending',
        claim: this.claimId,
      };
      this.loading = true;
      this.offerSer.makeOffer(requestBody).subscribe({
        next: (offer: any) => {
          this.notificationService.success('Offer Created.');
          this.loading = false;
          this.modal.close(offer);
        },

        error: () => (this.loading = false),
      });
    } else {
      this.notificationService.warning('Please enter a valid amount!');
    }
  }

  offerMade(status: string) {
    this.modal.close(status);
    this.loading = true;
    this.buttonLabel = status;
    let requestBody = {
      status: status,
    };

    this.offerSer.updateOffer(this.offer.id, requestBody).subscribe({
      next: () => {
        this.notificationService.success(
          `Offer ${status.charAt(0).toUpperCase() + status.slice(1)}.`
        );
        this.loading = false;
        this.modal.close(status);
      },
      error: (err) => {
        this.loading = false;
        this.notificationService.error(err);
      },
    });
  }
}
