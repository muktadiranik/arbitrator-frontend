import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { CreateDisputeComponent } from './components/create-dispute/create-dispute.component';

@Component({
  selector: 'app-all-disputes',
  templateUrl: './all-disputes.component.html',
  styleUrls: ['./all-disputes.component.scss'],
})
export class AllDisputesComponent implements OnInit {
  disputes: any[] = [];

  constructor(
    public disputeSer: DisputeService,
    private modalService: NzModalService,
    public authRoleService: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.disputeSer.getAllDisputes().subscribe((dispute: any) => {
      this.disputes = dispute;
    });
  }

  createMultipleDisputes(): void {
    const modal = this.modalService.create({
      nzTitle: 'Create Multiple Disputes',
      nzContent: CreateDisputeComponent,
      nzClosable: false,
      nzFooter: null,
      nzCentered: true,
    });
  }
}
