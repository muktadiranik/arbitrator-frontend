import { Component, OnInit, Input } from '@angular/core';
import { WitnessService } from 'src/app/shared/services/witness.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UploadWitnessesModalComponent } from '../upload-witnesses-modal/upload-witnesses-modal.component';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Witness } from 'src/app/shared/interfaces/witness';

@Component({
  selector: 'app-witness-table',
  templateUrl: './witness-table.component.html',
  styleUrls: ['./witness-table.component.scss'],
})
export class WitnessTableComponent implements OnInit {
  // @Input() claimID: any = '';
  @Input() loading = true;
  @Input() witnesses: any;

  listOfColumns: any[] = [
    {
      name: 'ID',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
    },

    {
      name: 'First Name',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: any, b: any) =>
        a.user.first_name.localeCompare(b.user.first_name),
    },

    {
      name: 'Last Name',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: any, b: any) =>
        a.user.last_name.localeCompare(b.user.last_name),
    },
    {
      name: 'Created By',
      filterMultiple: true,
      listOfFilter: [
        { text: 'Respondent', value: 'respondent' },
        { text: 'Claimer', value: 'claimer' },
        { text: 'Arbitrator', value: 'arbitrator' }, // For testing
        { text: 'Creator', value: 'creator' }, // For testing
      ],
      filterFn: (list: string[], item: any) =>
        list.some((name) => item.creator.type.indexOf(name) !== -1),
    },

    {
      name: 'Email',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: any, b: any) => a.user.email.localeCompare(b.user.email),
    },

    {
      name: 'View',
    },
  ];

  constructor(
    private witnesService: WitnessService,
    private modalService: NzModalService,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // if(this.witnesses)
    // this.witnesService.getAllWitnesses().subscribe({
    //   next: (witnesses: any) => {
    //     this.witnesses = witnesses;
    //     console.log(witnesses);
    //   },
    //   complete: () => {
    //     this.loading = false;
    //   },
    // });
    // this.loading = true;
    // this.witnesService.getDisputeWitnesses(169).subscribe({
    //   next: (disputeWitnesses: any) => {
    //     this.witnesses = disputeWitnesses;
    //     console.log(disputeWitnesses);
    //   },
    //   complete: () => {
    //     // this.loading = false;
    //   },
    // });
  }

  // getWitnesses(): void {
  //   if (this.claimID) {
  //     this.loading = true;
  //     this.witnesService.getDisputeWitnesses(169).subscribe({
  //       next: (disputeWitnesses: any) => {
  //         this.witnesses = disputeWitnesses;
  //         console.log(disputeWitnesses);
  //       },
  //       complete: () => {
  //         // this.loading = false;
  //       },
  //     });
  //   }
  // }

  editWitnessModal(witness: Witness): void {
    const modal = this.modalService.create({
      nzContent: UploadWitnessesModalComponent,
      nzFooter: null,
      nzWidth: '1000px',
      nzCentered: true,
      nzComponentParams: {
        witnesses: witness,
      },
    });

    modal.afterClose.subscribe((witness: any) => {
      if (witness != undefined) {
        this.witnesses = this.witnesses.map(
          (obj: any) =>
            [witness].find((eachwitness) => eachwitness.id === obj.id) || obj
        );
        // this.onChange.emit(witness);
      }
    });
  }
}
