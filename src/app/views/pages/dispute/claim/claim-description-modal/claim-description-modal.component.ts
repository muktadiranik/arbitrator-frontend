import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ClaimService } from 'src/app/shared/services/claim.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'claim-description-modal',
  templateUrl: './claim-description-modal.component.html',
  styleUrls: ['./claim-description-modal.component.scss'],
})
export class ClaimDescriptionModalComponent implements OnInit {
  @Input() viewType: string = '';
  @Input() claim: any = {};
  @Input() user: any = {};
  @Input() dispute: any = {};
  edit: boolean = false;
  loading = false;

  descForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private claimService: ClaimService,
    private notificationService: NotificationService
  ) {
    this.descForm = this.fb.group({
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.max(99999999),
      ]),
      description: new FormControl('', Validators.required),
    });
  }

  get amountControl() {
    return this.descForm.get('amount');
  }

  get descriptionControl() {
    return this.descForm.get('description');
  }

  ngOnInit(): void {
    if (this.claim && this.claim.id != null) {
      this.edit = true;
      this.descForm.get('description')?.patchValue(this.claim.description);
    } else {
      this.edit = false;
    }
  }

  startClaim() {
    this.loading = true;
    let requestBody = {
      dispute_id: this.dispute.id,
      email: this.user.user.email,
      description: this.descForm.get('description')?.value,
      claimed_amount: this.descForm.get('amount')?.value,
    };

    this.claimService.startClaim(requestBody).subscribe({
      next: (claim: any) => {
        this.notificationService.success('Claim Created!');
        this.loading = false;
        this.modal.close(claim);
      },
      error: () => (this.loading = false),
    });
  }

  updateDescription() {
    this.loading = true;
    let requestBody = {
      description: this.descForm.get('description')?.value,
    };

    this.claimService.updateClaim(requestBody, this.claim.id).subscribe({
      next: (claim: any) => {
        this.loading = false;
        this.modal.close(claim);
      },
      error: () => (this.loading = false),
    });
  }
}
