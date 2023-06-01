import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { ClaimDescriptionModalComponent } from '../claim-description-modal/claim-description-modal.component';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { Witness } from 'src/app/shared/interfaces/witness';
import { ShowEvidencesComponent } from '../../evidence/show-evidences/show-evidences.component';
import { ShowWitnessesComponent } from 'src/app/shared/components/witness/show-witnesses/show-witnesses.component';
import { NotesTableComponent } from '../../note-board/components/notes/notes-table/notes-table.component';
import { DisputeTabsService } from '../../dispute-base/dispute-tabs.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WitnessService } from 'src/app/shared/services/witness.service';
import { Location } from '@angular/common';
import { AmountUtil } from 'src/app/shared/utils/amount';

@UntilDestroy()
@Component({
  selector: 'claim-actions',
  templateUrl: './claim-actions.component.html',
  styleUrls: ['./claim-actions.component.scss'],
})
export class ClaimActionsComponent implements OnInit, AfterViewChecked {
  loading = false;
  viewType: string = '';
  user: any = null;
  dispute: any = null;
  claim: any = null; //claim sometimes comes as null

  currentTab = 0;
  buttonLabel = 'Edit';
  witnesses: Witness[] = [];

  amountUtil = AmountUtil;

  @ViewChild('evidenceComp') Evidences!: ShowEvidencesComponent;
  @ViewChild('witnessComp') Witnesses!: ShowWitnessesComponent;
  @ViewChild('notesTableComp') NotesComp!: NotesTableComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    public authRoleService: AuthRoleService,
    private modalService: NzModalService,
    private disputeService: DisputeService,
    private authSer: AuthService,
    private disputeTabs: DisputeTabsService,
    private notificationService: NotificationService,
    private witnessService: WitnessService,
    private locationService: Location
  ) {}
  ngAfterViewChecked(): void {
    this.updateStepperStatus();
  }
  ngOnInit(): void {
    this.viewType = this.activatedRoute.snapshot.data['viewType'];
    this.authRoleService.dispute$
      .pipe(untilDestroyed(this))
      .subscribe((dispute) => {
        this.dispute = dispute;
        this.claim = dispute.claim;
        if (this.viewType == 'w') {
          this.activatedRoute.params
            .pipe(untilDestroyed(this))
            .subscribe((event) => {
              if (event['id']) {
                this.loading = true;
                this.witnessService
                  .getWitnessById(event['id'])
                  .pipe(untilDestroyed(this))
                  .subscribe({
                    next: (witness: any) => {
                      this.user = witness;
                      this.loading = false;
                    },
                    error: () => {
                      this.loading = false;
                      this.locationService.back(); // witness not found go back please!
                    },
                  });
              } else {
                this.user = this.authRoleService.loggedUser.actor; //witness/actions will be removed in future
              }
            });
        } else {
          this.user =
            this.dispute[this.viewType == 'c' ? 'claimer' : 'respondent'];
        }
        if (dispute.claim == null) {
          if (this.viewType == 'c') {
            this.openDescriptionEditModal();
            this.buttonLabel = 'Add';
          }
        } else {
          if (this.viewType == 'c') {
            this.buttonLabel = 'Edit';
          }
        }
      });
  }

  updateStepperStatus() {
    if (!this.claim || this.viewType == 'w') return;
    if (
      this.Evidences.evidences.length &&
      (this.Witnesses.witnesses.length ||
        this.Witnesses.dispute.contains_witness) &&
      this.NotesComp?.notes?.length
    ) {
      this.currentTab = 3;
    } else if (
      this.Evidences.evidences.length &&
      (this.Witnesses.witnesses.length ||
        this.Witnesses.dispute.contains_witness)
    ) {
      this.currentTab = 2;
    } else if (this.Evidences.evidences.length) {
      this.currentTab = 1;
    } else {
      this.currentTab = 0;
    }
  }

  openDescriptionEditModal() {
    const modal = this.modalService.create({
      nzContent: ClaimDescriptionModalComponent,
      nzFooter: null,
      nzWidth: '1100px',
      nzComponentParams: {
        claim: this.claim,
        dispute: this.dispute,
        viewType: this.viewType,
        user: this.user,
      },
    });

    modal.afterClose.subscribe((claim) => {
      if (claim == undefined) return; //was closed without any change
      this.claim = claim;
      if (this.buttonLabel == 'Add') {
        // the claim was added
        if (this.dispute.respondent != null) {
          this.disputeTabs.pushTab('respondent');
        }
      }
      this.authRoleService.dispute = { ...this.dispute, claim: claim };
      if (this.claim.id) {
        this.buttonLabel = 'Edit';
        if (claim && claim.claimAmount) {
          this.disputeService
            .getDisputeDetailsByID(this.dispute.id)
            .pipe(untilDestroyed(this))
            .subscribe();
        }
      }
    });
  }
  isDisputeResolved(dispute: any): boolean {
    return dispute.status === 'resolved';
  }
}
