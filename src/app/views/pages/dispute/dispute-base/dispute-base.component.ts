import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { ITab } from '../models/dispute-tab-titles.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { DisputeTabsService } from './dispute-tabs.service';
import { EMPTY, catchError, map, switchMap, throwError } from 'rxjs';
import { Witness } from 'src/app/shared/interfaces/witness';
import { ActorUtil } from 'src/app/shared/utils/actor';
import { Dispute } from 'src/app/shared/interfaces/dispute';
import { WitnessService } from 'src/app/shared/services/witness.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
@UntilDestroy()
@Component({
  selector: 'app-dispute-base',
  templateUrl: './dispute-base.component.html',
  styleUrls: ['./dispute-base.component.scss'],
})
export class DisputeBaseComponent implements OnInit {
  tabs: ITab[] = [];
  disputeId!: number;
  dispute!: Dispute;
  loading = false;
  witnessesLength = 0;
  isWitnessLoading = false;
  claimerWitness: Witness[] = [];
  respondentWitness: Witness[] = [];

  ActorUtil = ActorUtil;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private witnessService: WitnessService,
    private disputeService: DisputeService,
    private disputeTabs: DisputeTabsService,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.disputeId = Number(params.get('id'));
          return this.disputeService.getDisputeDetailsByID(this.disputeId).pipe(
            catchError((error) => {
              if (
                error.status == 404 &&
                this.authRoleService.userType == 'arbitrator'
              ) {
                return this.disputeService
                  .getDisputePendingApprovals(this.disputeId)
                  .pipe(
                    map((dispute: any) =>
                      dispute && dispute.length
                        ? dispute[0]
                        : this.navigateToHomePage()
                    )
                  );
              }
              return throwError(() => error);
            })
          );
        })
      )
      .subscribe({
        next: (dispute: any) => {
          this.next(dispute);
        },
        error: (error) => {
          this.notificationService.error('Dispute not found.');
          this.navigateToHomePage();
        },
      });

    //updating all witnesses on a dispute
    this.authRoleService.getWitnesses().subscribe({
      next: (witnesses: any) => {
        this.isWitnessLoading = false;
        this.classifyWitnesses(witnesses);
      },
      error: () => (this.isWitnessLoading = false),
    });
  }

  navigateToHomePage(): void {
    this.loading = false;
    this.router.navigate(this.authRoleService.HOME_PAGE);
  }

  next(dispute: Dispute): void {
    this.loading = false;
    this.dispute = dispute;
    this.authRoleService.dispute = dispute;

    if (dispute.respondent == null) {
      this.disputeTabs.removeTab('respondent');
      this.disputeTabs.removeTab('respondentme');
      this.disputeTabs.removeTab('respondent-handoff');
    }

    if (dispute.claimer && dispute.claimer.invitation_url == null) {
      this.disputeTabs.removeTab('claimer-handoff');
    }

    if (dispute.respondent && dispute.respondent.invitation_url == null) {
      this.disputeTabs.removeTab('respondent-handoff');
    }

    this.disputeTabs.tabs$.subscribe({
      next: (tabs) => {
        this.tabs = tabs;
      },
    });

    //loading all witnesses on a dispute;
    if (dispute.claim) {
      this.isWitnessLoading = true;
      this.witnessService.getDisputeWitnesses(dispute.claim.id).subscribe({
        next: (witnesses: any) => {
          this.isWitnessLoading = false;
          this.classifyWitnesses(witnesses);
        },
        error: () => (this.isWitnessLoading = false),
      });
    }
  }

  classifyWitnesses(witnesses: Witness[]) {
    this.authRoleService.userType == 'claimer'
      ? (this.claimerWitness = [])
      : (this.respondentWitness = []);

    witnesses.forEach((witness: Witness) => {
      witness?.creator?.type == 'claimer'
        ? this.claimerWitness.push(witness)
        : this.respondentWitness.push(witness);
    });

    this.witnessesLength =
      this.claimerWitness.length + this.respondentWitness.length;
  }

  witnessDetail(witness: Witness) {
    this.router.navigate(
      [`/dispute/${this.dispute.id}/witness/${witness.id}/actions`],
      { state: { witness } }
    );
  }
}
