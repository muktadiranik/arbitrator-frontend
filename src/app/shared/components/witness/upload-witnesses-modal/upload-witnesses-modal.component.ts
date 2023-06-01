import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Witness } from 'src/app/shared/interfaces/witness';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WitnessService } from 'src/app/shared/services/witness.service';
import { DisputeService } from '../../../../views/pages/dispute/shared/dispute.service';

@Component({
  selector: 'app-upload-winesses-modal',
  templateUrl: './upload-witnesses-modal.component.html',
  styleUrls: ['./upload-witnesses-modal.component.scss'],
})
export class UploadWitnessesModalComponent implements OnInit {
  @Input() witnesses!: Witness;
  @Input() dispute: any;
  @Input() user: any;
  edit: boolean = false;
  loading = false;
  witnessInfoForm!: FormGroup;

  link: string = '';

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private disputeSer: DisputeService,
    private witnesService: WitnessService,
    private message: NzMessageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.witnessInfoForm = this.fb.group({
      user: this.fb.group({
        first_name: [null],
        last_name: [null],
        email: [null, [Validators.email]],
      }),
      relation: [null],
      phone_number: [null],
      type: ['witness'],
      dispute: this.fb.group({
        code: [null],
      }),
    });

    if (this.witnesses) {
      //must be edit mode, no need to mention explicitly
      this.witnessInfoForm.patchValue(this.witnesses);
      this.edit = true;
      this.link = <string>this.witnesses.invitation_url;
    }
  }

  addWitness() {
    this.loading = true;
    this.witnessInfoForm.get('dispute.code')?.patchValue(this.dispute.code);

    this.disputeSer.partialRegistration(this.witnessInfoForm.value).subscribe({
      next: (witness: any) => {
        this.link = witness.invitation_url;
        this.notificationService.success('Witness Registered.');
        this.loading = false;
        this.modal.close(witness);
      },
      error: () => (this.loading = false),
    });
  }

  editWitness() {
    this.loading = true;
    let requestBody: any = {
      user: {
        id: this.witnesses?.user.id,
        first_name: this.witnessInfoForm.get('user.first_name')?.value,
        last_name: this.witnessInfoForm.get('user.last_name')?.value,
      },
      relation: this.witnessInfoForm.get('relation')?.value,
      phone_number: this.witnessInfoForm.get('phone_number')?.value,
    };

    if (this.witnessInfoForm.get('user.email')?.touched) {
      requestBody.user.email = this.witnessInfoForm.get('user.email')?.value;
    }

    this.witnesService
      .editWitness(requestBody, Number(this.witnesses.id))
      .subscribe({
        next: (witness) => {
          this.notificationService.success('Witness Updated');
          this.loading = false;
          this.modal.close(witness);
        },
        error: () => (this.loading = false),
      });
  }

  submitForm(): void {
    if (this.witnessInfoForm.valid) {
    } else {
      Object.values(this.witnessInfoForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
