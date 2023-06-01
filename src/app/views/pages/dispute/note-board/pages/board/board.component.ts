import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { CaucusTimerComponent } from '../../../time-log/components/caucus-timer/caucus-timer.component';
import { PlenaryTimerComponent } from '../../../time-log/components/plenary-timer/plenary-timer.component';
import { TimeLogComponent } from '../../../time-log/time-log.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  dispute!: any;
  constructor(
    private modalService: NzModalService,
    public authRoleService: AuthRoleService
  ) {}
  @ViewChild('timer') PlenaryTimer!: PlenaryTimerComponent;
  @ViewChild('caucustimer') CaucusTimer!: CaucusTimerComponent;

  ngOnInit(): void {
    this.authRoleService.dispute$
      .pipe(untilDestroyed(this))
      .subscribe((dispute) => {
        this.dispute = dispute;
      });
  }

  openTimelog() {
    this.modalService.create({
      nzContent: TimeLogComponent,
      nzFooter: null,
      nzWidth: '1100px',
    });
  }
}
