import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { OffersService } from '../../../../shared/services/offers.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Witness } from 'src/app/shared/interfaces/witness';
import { Offer } from 'src/app/shared/interfaces/offer';
import { Actor } from 'src/app/shared/interfaces/auth';
import { DisputeTabsService } from '../dispute-base/dispute-tabs.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AmountUtil } from 'src/app/shared/utils/amount';
@UntilDestroy()
@Component({
  selector: 'app-dispute-details',
  templateUrl: './dispute-details.component.html',
  styleUrls: ['./dispute-details.component.scss'],
})
export class DisputeDetailsComponent implements OnInit {
  viewType: String = '';
  heading: String = '';
  // user: any = { first_name: '', last_name: '' };
  dispute!: any;
  actor!: Actor;

  isOffersLoaded: boolean = false;

  buttonLabel = 'Add offer';
  witnesses: Witness[] = [];
  offers: Offer[] = [];

  amountUtil = AmountUtil;

  constructor(
    private offerSer: OffersService,
    private route: ActivatedRoute,
    private router: Router,
    public authRoleService: AuthRoleService,
    private disputeTabs: DisputeTabsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.viewType = this.route.snapshot.data['viewType'];
    this.viewType == 'c'
      ? (this.heading = 'Claimer')
      : (this.heading = 'Respondent');

    this.authRoleService.dispute$
      .pipe(untilDestroyed(this))
      .subscribe((dispute: any) => {
        this.dispute = dispute;
        this.actor =
          dispute && dispute[this.heading.toLowerCase()]
            ? dispute[this.heading.toLowerCase()]
            : undefined;

        if (dispute.claim != null) {
          // this.user = this.actor.user;
          this.updateOffersList();
        }
      });
  }

  updateOffersList() {
    this.offerSer
      .getOffers(this.dispute.claim.id)
      .pipe(untilDestroyed(this))
      .subscribe((offers: any) => {
        this.offers = offers;
        this.isOffersLoaded = true;
        this.offers.forEach((offer: Offer) => {
          if (offer.status == 'accepted') this.isOffersLoaded = false;
        });
      });
  }

  updateOffers(event: any) {
    this.offers.unshift(event);
    let tempData = JSON.parse(JSON.stringify(this.offers));
    this.offers = [];
    this.offers = tempData;
  }
  isDisputeResolved(dispute: any): boolean {
    return dispute.status === 'resolved';
  }
}
