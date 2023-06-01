import { Component, Input, OnInit } from '@angular/core';
import { Evidence } from 'src/app/shared/interfaces/evidence';
import { EvidenceService } from 'src/app/shared/services/evidence.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ClaimerRespondentService } from '../../../claimer-respondent/shared/claimer-respondent.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-upload-evidence-modal',
  templateUrl: './upload-evidence-modal.component.html',
  styleUrls: ['./upload-evidence-modal.component.scss'],
})
export class UploadEvidenceModalComponent implements OnInit {
  @Input() evidences!: Evidence[];
  @Input() user: any;
  @Input() claim: any;

  loading: boolean = false;
  fileList: NzUploadFile[] = [];

  constructor(
    private evidenceService: EvidenceService,
    private notificationService: NotificationService,
    private claimerRespondentSer: ClaimerRespondentService
  ) {}

  ngOnInit(): void {}

  uploadEvidence() {
    this.loading = true;
    const formData = new FormData();
    formData.append('attachment', this.fileList[0] as any);
    formData.append('user_email', this.user.user.email);
    formData.append('claim_id', this.claim.id);

    this.evidenceService.addEvidence(formData).subscribe({
      next: (evidence: any) => {
        this.notificationService.success('Evidence Added.');
        this.claimerRespondentSer.sendAlert('evidence');
        this.evidences.push(evidence);
        this.loading = false;
        this.fileList = [];
      },
      error: () => {
        this.loading = false;
        this.fileList = [];
      },
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
}
