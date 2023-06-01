import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { YyyyMmDdPipe } from 'src/app/shared/pipes/date/yyyy-mm-dd/yyyy-mm-dd.pipe';
import { ActorsService } from 'src/app/shared/services/actors.service';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { ActorUtil } from 'src/app/shared/utils/actor';

@Component({
  selector: 'app-arbitrator-assignment-modal',
  templateUrl: './arbitrator-assignment-modal.component.html',
  styleUrls: ['./arbitrator-assignment-modal.component.scss'],
})
export class ArbitratorAssignmentModalComponent implements OnInit {
  @Input() disputes!: any;
  actorUtil = ActorUtil;
  assignArbitratorForm!: FormGroup;
  arbitrators!: any;
  loading: boolean = false;

  constructor(
    private modal: NzModalRef,
    private actorService: ActorsService,
    private fb: FormBuilder,
    private disputeService: DisputeService
  ) {}

  ngOnInit(): void {
    this.assignArbitratorForm = this.fb.group({
      arbitrator_id: new FormControl([], Validators.required),
      disputes: new FormControl([], Validators.required),
    });
    this.actorService.getAllActors('arbitrators').subscribe({
      next: (response) => {
        // console.log(response);
        this.arbitrators = response;
      },
      error: (error) => {},
    });
  }

  onSubmit = () => {
    console.log(this.assignArbitratorForm.value);
    this.loading = true;
    const testParams = { arbitrator_id: 123123, disputes: [123123] };
    this.disputeService
      .assignDisputeToArbitrator(this.assignArbitratorForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.modal.close(true);
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        },
      });
  };
}
