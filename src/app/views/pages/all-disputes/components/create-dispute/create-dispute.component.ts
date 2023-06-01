import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { ActorsService } from 'src/app/shared/services/actors.service';
import { ActorUtil } from 'src/app/shared/utils/actor';
import { DisputeService } from '../../../dispute/shared/dispute.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-create-dispute',
  templateUrl: './create-dispute.component.html',
  styleUrls: ['./create-dispute.component.scss'],
})
export class CreateDisputeComponent implements OnInit {
  disputeFormGroup: FormGroup;
  creators: any;
  loading: boolean = false;
  isCreatorsLoading: boolean = false;

  actorUtil = ActorUtil;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private actorService: ActorsService,
    private disputeService: DisputeService,
    private notificationService: NotificationService
  ) {
    this.disputeFormGroup = this.fb.group({
      creator_id: new FormControl(null, Validators.required),
      count: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.isCreatorsLoading = true;
    this.actorService
      .getAllActors('creators')
      .pipe(finalize(() => (this.isCreatorsLoading = false)))
      .subscribe({
        next: (response) => {
          this.creators = response;
        },
      });
  }

  createDisputes(): void {
    this.loading = true;

    console.log(this.disputeFormGroup.value);
    this.disputeService
      .createBulkDisputes(this.disputeFormGroup.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          console.log('disputes creatord');
          this.notificationService.success(
            `${
              this.disputeFormGroup.get('count')?.value
            } ${this.getMessage()} created.`
          );
          this.modal.close();
        },
      });
  }

  getMessage(): string {
    return this.disputeFormGroup.get('count')?.value > 1
      ? 'disputes'
      : 'dispute';
  }
}
