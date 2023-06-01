import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Claim, Dispute } from 'src/app/shared/interfaces/dispute';
import { Offer } from 'src/app/shared/interfaces/offer';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { AmountUtil } from 'src/app/shared/utils/amount';
import { OffersComponent } from '../offers/offers.component';

@Component({
  selector: 'add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  @Input() dispute!: Dispute;
  @Input() offers!: Offer[];
  @Input() disabled: boolean = false;
  @Output() offersUpdate = new EventEmitter<Offer>();

  viewType: string = '';
  buttonLabel = 'Add offer';

  amountUtil = AmountUtil;

  constructor(
    private route: ActivatedRoute,
    private message: NzMessageService,
    private modalService: NzModalService,
    public authRoleService: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.viewType = this.route.snapshot.data['viewType'];
    this.updateButtonLabel();
  }

  createOffer() {
    if (this.buttonLabel != '') {
      if (this.offers.length) {
        const latestOffer = this.offers[this.offers.length - 1];
        if (latestOffer.status == 'accepted') {
          this.message.create(
            'success',
            'Claimer has already accepted your previous offer!.'
          );
        } else if (latestOffer.status == 'rejected') {
          this.createOfferModal();
        } else {
          this.message.create(
            'error',
            "Claimer hasn't responded to your previous offer, wait for claimer's reply!."
          );
        }
      } else {
        this.createOfferModal();
      }
    }
  }

  createOfferModal() {
    const latestOffer = this.offers[this.offers.length - 1];
    const modal = this.modalService.create({
      nzContent: OffersComponent,
      nzFooter: null,
      nzWidth: '1100px',
      nzCentered: true,
      nzComponentParams: {
        inputData: this.offers,
        claimId: this.dispute.claim?.id,
        data: {
          amountClaimed: this.amountUtil.appendCurrency(
            <Claim>this.dispute.claim,
            'claimed_amount'
          ),
          offerHeading:
            latestOffer?.status == 'rejected'
              ? 'Make Final Offer'
              : 'Make An Offer',
          offerMsg:
            latestOffer?.status == 'rejected'
              ? 'This is the final offer you can make. Select any of the offers we recommend or make your own'
              : 'Let us help you settle this dispute as soon as possible, select any of the offers we recommend or make your own.',
          status: 'Chance Of Success',
          reply: 'if you offer',
          showTable: true,
          type: 'respondent',
        },
      },
    });

    modal.afterClose.subscribe((offer: Offer) => {
      if (offer) {
        this.offersUpdate.emit(offer);
        this.updateButtonLabel();
      }
    });
  }

  updateButtonLabel() {
    if (this.offers.length == 1) {
      this.buttonLabel = 'Last offer before hearing';
    } else if (this.offers.length >= 2) {
      this.buttonLabel = ''; //we need to hide the button
    }
  }
}
