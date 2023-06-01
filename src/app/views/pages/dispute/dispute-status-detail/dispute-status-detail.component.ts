import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { ClaimerRespondentService } from '../../claimer-respondent/shared/claimer-respondent.service';

@Component({
  selector: 'dispute-status-detail',
  templateUrl: './dispute-status-detail.component.html',
  styleUrls: ['./dispute-status-detail.component.scss'],
})
export class DisputeStatusDetailComponent implements OnInit {
  tableName: string = '';
  tableData: any[] = [];
  constructor(
    private disputeService: DisputeService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.tableName = this.route.snapshot.url[0].path;
    this.disputeService
      .getDisputesFilteredData(this.route.snapshot.url[0].path)
      .subscribe((res: any) => {
        this.tableData = res;
      });
  }
}
