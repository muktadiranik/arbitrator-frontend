import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UploadWitnessesModalComponent } from 'src/app/shared/components/witness/upload-witnesses-modal/upload-witnesses-modal.component';
import { WitnessService } from 'src/app/shared/services/witness.service';
import { Witness } from 'src/app/shared/interfaces/witness';
import { Actor } from 'src/app/shared/interfaces/auth';
import { Claim, Dispute } from 'src/app/shared/interfaces/dispute';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';
import { ActorUtil } from 'src/app/shared/utils/actor';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { DateUtil } from 'src/app/shared/utils/date';
@UntilDestroy()
@Component({
  selector: 'app-show-witnesses',
  templateUrl: './show-witnesses.component.html',
  styleUrls: ['./show-witnesses.component.scss'],
})
export class ShowWitnessesComponent implements OnInit {
  @Input() witnesses: Witness[] = [];
  // @Input() skipWitness: boolean = false;
  @Input() rowCount = 3;
  @Input() claim!: Claim;
  @Input() dispute!: Dispute;
  @Input() actor!: Actor;
  @Input() canAdd = false;
  @Input() canEdit = false;
  @Input() canDelete = false;
  @Output() onDelete = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Input() disabled: boolean = false;
  loading = false;

  dateUtil = DateUtil;
  ActorUtil = ActorUtil;

  constructor(
    private router: Router,
    private modalService: NzModalService,
    private witnesService: WitnessService,
    private disputeService: DisputeService,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (!this.witnesses.length && this.claim) {
      this.loading = true;
      this.witnesService
        .getAllWitnessesByCreatorID(this.actor.id, this.claim.id)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (witnesses: any) => {
            this.witnesses = witnesses;
            // if (res.length == 0) {
            //   this.skipWitness = false;
            // } else {
            //   this.skipWitness = true;
            // }
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  editWitnessModal(witness: Witness): void {
    const modal = this.modalService.create({
      nzContent: UploadWitnessesModalComponent,
      nzFooter: null,
      nzWidth: '1000px',
      nzCentered: true,
      nzComponentParams: {
        witnesses: witness,
        // edit: true,
      },
    });

    modal.afterClose.subscribe((witness: any) => {
      if (witness != undefined) {
        this.witnesses = this.witnesses.map(
          (obj) =>
            [witness].find((eachwitness) => eachwitness.id === obj.id) || obj
        );
        this.onChange.emit(witness);
      }
    });
  }

  deleteWitness(witness: Witness) {
    this.witnesService.deleteWitness(witness.id).subscribe(() => {
      this.witnesses = this.witnesses.filter(
        (currWitness: Witness) => currWitness.id != witness.id
      );
      this.notificationService.success('Witness Deleted.');
      this.authRoleService.setWitnesses(this.witnesses);

      this.onDelete.emit(witness);
    });
  }

  skipWitnessFunc() {
    this.disputeService
      .updateDispute(this.dispute.id, { contains_witness: true })
      .pipe(untilDestroyed(this))
      .subscribe((dispute: any) => {
        // this.dispute = dispute;
        this.authRoleService.dispute = dispute;
        this.notificationService.success('Witness Skipped!');
      });
  }

  addWitnessModal() {
    if (this.claim.id) {
      const modal = this.modalService.create({
        nzContent: UploadWitnessesModalComponent,
        nzFooter: null,
        nzWidth: '1000px',
        nzCentered: true,
        nzComponentParams: {
          dispute: this.dispute,
          user: this.actor,
        },
      });

      modal.afterClose.subscribe((witness) => {
        if (witness == undefined) return; //was closed without any change
        this.witnesses.push(witness);

        this.authRoleService.setWitnesses(this.witnesses);
      });
    } else {
      this.notificationService.warning('Please add Claim description first!.');
    }
  }

  viewWitnessDetail(witness: Witness) {
    this.router.navigate([
      `/dispute/${this.dispute.id}/witness/${witness.id}/actions`,
    ]);
  }
}
