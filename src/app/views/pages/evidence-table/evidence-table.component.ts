import { Component, Input, OnInit } from '@angular/core';
import { MMDdYyyyPipe } from 'src/app/shared/pipes/date/mm-dd-yyyy/mm-dd-yyyy.pipe';
import { EvidenceService } from 'src/app/shared/services/evidence.service';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { Evidence } from 'src/app/shared/interfaces/evidence';
import { FileUtil } from 'src/app/shared/utils/file';
import { DateUtil } from 'src/app/shared/utils/date';

@Component({
  selector: 'app-evidence-table',
  templateUrl: './evidence-table.component.html',
  styleUrls: ['./evidence-table.component.scss'],
})
export class EvidenceTableComponent implements OnInit {
  evidences: any[] = [];
  dateUtil = DateUtil;
  @Input() isLoading: boolean = true;

  fileUtil = FileUtil;
  listOfColumns: any[] = [
    {
      name: 'Actor',
      filterMultiple: true,
      listOfFilter: [
        { text: 'Respondent', value: 'respondent' },
        { text: 'Claimer', value: 'claimer' },
        { text: 'Arbitrator', value: 'arbitrator' },
        { text: 'Creator', value: 'creator' },
      ],
      filterFn: (list: string[], item: any) =>
        list.some((name) => item.creator.type.indexOf(name) !== -1),
    },
    {
      name: 'Created_at',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
    },

    {
      name: 'Evidence',
    },

    {
      name: 'Dispute',
    },
  ];

  constructor(
    private evidenceService: EvidenceService,
    public datePipe: MMDdYyyyPipe
  ) {}

  ngOnInit(): void {
    this.evidenceService.getEvidences().subscribe((evidences: any) => {
      this.evidences = evidences;
      this.isLoading = false;
    });
  }

  downloadEvidence(evidence: Evidence) {
    console.log(evidence.attachment.split('/'));
    window.open(evidence.attachment);
  }

  getColorByType(type: string): string {
    switch (type) {
      case 'respondent':
        return 'blue';
      case 'claimer':
        return 'green';
      case 'arbitrator':
        return 'yellow';
      case 'creator':
        return 'red';
      case 'witness':
        return 'purple';
      default:
        return 'gray';
    }
  }
}
