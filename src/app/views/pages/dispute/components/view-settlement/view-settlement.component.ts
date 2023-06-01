import { Component, Input, OnInit } from '@angular/core';
import { DisputeService } from '../../shared/dispute.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SettlementAgreement } from 'src/app/shared/interfaces/dispute';
import { finalize, tap } from 'rxjs';
import {
  DisputeDropDown,
  OfferDropdown,
  summernoteConfig,
} from 'src/app/shared/configs/summernote';
import { SummerNote } from 'src/app/shared/interfaces/summernote';

@Component({
  selector: 'view-settlement',
  templateUrl: './view-settlement.component.html',
  styleUrls: ['./view-settlement.component.scss'],
})
export class ViewSettlementComponent implements OnInit {
  @Input() disputeId!: number;

  settlementAgreement!: SettlementAgreement;
  isVisible: boolean = false;
  isLoading: boolean = false;
  isAgreementLoading: boolean = false;

  editorConfig!: SummerNote;

  constructor(
    private disputeService: DisputeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editorConfig = summernoteConfig;
    this.editorConfig.height = 350;
    this.editorConfig['buttons'] = {
      offer: OfferDropdown,
      dispute: DisputeDropDown,
    };
  }

  getSettlementAgreement(): void {
    this.isAgreementLoading = true;
    this.disputeService
      .getSettlementAgreement(this.disputeId)
      .pipe(finalize(() => (this.isAgreementLoading = false)))
      .subscribe((settlementAgreement: any) => {
        if (!settlementAgreement) {
          this.notificationService.error('Not Found!');
          return;
        }

        this.settlementAgreement = settlementAgreement;
        this.isVisible = true;
      });
  }

  submitAgreement(): void {
    this.isLoading = true;

    this.disputeService
      .updateSettlementAgreement(this.settlementAgreement.id, {
        content: this.settlementAgreement.content,
      })
      .pipe(
        finalize(() => {
          this.isVisible = false;
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.notificationService.success('Updated Successfully.');
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
