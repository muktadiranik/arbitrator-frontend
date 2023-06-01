import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Offer } from 'src/app/shared/interfaces/offer';
import { RoundPercentage } from 'src/app/shared/utils/round-percentage.utils';
import { OffersComponent } from '../offers/offers.component';
import { Router } from '@angular/router';

@Component({
  selector: 'view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.scss'],
})
export class ViewOfferComponent implements OnInit {
  @Input() offer!: Offer;

  constructor(private modalService: NzModalService, private router: Router) {}

  ngOnInit(): void {}

  respondToOffer(offer: any) {
    console.log(offer);
    if (offer.status == 'pending') {
      const modal = this.modalService.create({
        nzContent: OffersComponent,
        nzFooter: null,
        nzWidth: '1100px',
        nzComponentParams: {
          inputData: [],
          offer: offer,
          data: {
            offerAmount: offer.offered_amount,
            offerPercentage: this.calculatePer(
              offer.offered_amount,
              offer.claimed_amount
            ),
            offerHeading: 'Offers Received',
            offerMsg:
              'Let us help you settle this dispute as soon as possible, you can accept or decline it to receive a new one.',
            status: 'Chance Of Success',
            reply: 'if you accept',
            showTable: false,
            type: 'none',
          },
        },
      });

      modal.afterClose.subscribe((res: any) => {
        if (res != undefined) {
          offer.status = res;
          const disputeId = this.router.parseUrl(this.router.url).root.children[
            'primary'
          ].segments[1];
          this.router.navigate([`/dispute/${disputeId}/claimer/actions`]);
        }
      });
    }
  }

  calculatePer(offerAmount: any, claimedAmount: any) {
    return RoundPercentage.Round((offerAmount / claimedAmount) * 100);
  }
}
