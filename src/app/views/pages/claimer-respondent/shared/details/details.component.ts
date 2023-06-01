import { Component, OnInit } from '@angular/core';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { ClaimerRespondentService } from '../claimer-respondent.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  tableData: any[] = [];
  constructor(private disputeService: DisputeService) {}

  ngOnInit(): void {
    // this.claimerRespondentService.sendAlert(false);
    this.disputeService.getDisputes().subscribe((res: any) => {
      this.tableData = res;
    });
  }
}
