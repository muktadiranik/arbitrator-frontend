import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Evidence } from 'src/app/shared/interfaces/evidence';
import { EvidenceService } from 'src/app/shared/services/evidence.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Claim } from 'src/app/shared/interfaces/dispute';
import { Actor } from 'src/app/shared/interfaces/auth';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UploadEvidenceModalComponent } from '../upload-evidence-modal/upload-evidence-modal.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FileUtil } from 'src/app/shared/utils/file';
import { DateUtil } from 'src/app/shared/utils/date';

@UntilDestroy()
@Component({
  selector: 'app-show-evidences',
  templateUrl: './show-evidences.component.html',
  styleUrls: ['./show-evidences.component.scss'],
})
export class ShowEvidencesComponent implements OnInit {
  @Input() evidences: Evidence[] = [];
  @Input() rowCount = 3;
  @Input() claim!: Claim;
  @Input() actor!: Actor;
  @Input() canAdd = false;
  @Input() canDelete = false;
  @Output() onDelete = new EventEmitter();
  @Input() disabled: boolean = false;
  loading = false;

  dateUtil = DateUtil;
  fileUtil = FileUtil;

  constructor(
    private evidenceService: EvidenceService,
    private modalService: NzModalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (!this.evidences.length && this.claim) {
      this.loading = true;
      this.evidenceService
        .getAllEvidencesWithId(this.actor?.id, this.claim.id)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (evidences: any) => {
            this.evidences = evidences;
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  downloadEvidence(evidence: Evidence) {
    console.log(evidence.attachment.split('/'));
    window.open(evidence.attachment);
  }

  deleteEvidence(evidence: Evidence) {
    this.evidenceService.deleteEvidence(evidence.id).subscribe(() => {
      this.evidences = this.evidences.filter(
        (currEvidence: Evidence) => currEvidence.id != evidence.id
      );
      this.notificationService.success('Evidence deleted.');
      this.onDelete.emit(evidence);
    });
  }

  addEvidenceModal() {
    if (this.claim.id) {
      const modal = this.modalService.create({
        nzContent: UploadEvidenceModalComponent,
        nzFooter: null,
        nzWidth: '1100px',
        nzComponentParams: {
          evidences: this.evidences,
          claim: this.claim,
          user: this.actor,
        },
      });

      modal.afterClose.subscribe((evidences: Evidence[]) => {
        if (evidences == undefined) return; //was closed without any change
        this.evidences = evidences;
      });
    }
  }

  //This should be in a util file
  fileExtension: any = {
    '.pdf': 'assets/file-extensions/pdf.svg',
    '.docx': 'assets/file-extensions/word.svg',
    '.doc': 'assets/file-extensions/word.svg',
    '.xlx': 'assets/file-extensions/excel.svg',
    '.xlsx': 'assets/file-extensions/excel.svg',
    '.mp4': 'assets/file-extensions/video.svg',
    '.png': 'assets/file-extensions/image.svg',
    '.jpg': 'assets/file-extensions/image.svg',
  };

  fileTypeAvatar(evidence: Evidence) {
    const fileAvatar = this.fileExtension[evidence.extension];
    // if (['.png', '.jpg'].includes(evidence.extension)) {
    //   return evidence.attachment;
    // } else
    if (fileAvatar == undefined) {
      return '';
    } else {
      return fileAvatar;
    }
  }
}
