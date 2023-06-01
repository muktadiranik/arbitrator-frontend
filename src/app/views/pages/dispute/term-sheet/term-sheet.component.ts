import { Component, OnInit } from '@angular/core';
import { finalize, switchMap } from 'rxjs';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { ArbitratorLibraryService } from '../../arbitrator/shared/arbitrator-library/shared/arbitrator-library.service';
import { ArbitratorService } from '../../arbitrator/shared/arbitrator.service';
import { ClaimerRespondentService } from '../../claimer-respondent/shared/claimer-respondent.service';
import { TermSheetService } from './services/term-sheet.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotificationService } from 'src/app/shared/services/notification.service';
@UntilDestroy()
@Component({
  selector: 'app-term-sheet',
  templateUrl: './term-sheet.component.html',
  styleUrls: ['./term-sheet.component.scss'],
})
export class TermSheetComponent implements OnInit {
  termSheetTitles: any[] = [];
  termSheetSectionTitles: any[] = [];

  defaultSectionTitles: { title: string }[] = [
    { title: 'Preamble' },
    { title: 'Agreements' },
    { title: 'Other Terms / Non-Digital Signatures' },
  ];

  termSheetDetail: any;
  dispute!: any;
  termSheetSection: any[] = [];
  listOfSignatures: any[] = [];
  clauseList: any[] = [];

  folderList: any[] = [];
  enable = false;
  isVisible = false;
  isSpinning = false;
  isSignatureLoading = true;

  sectionUpdateRequestBody: any[] = [];

  drawerVisibility: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private termSheetSer: TermSheetService,
    private librarySer: ArbitratorLibraryService,
    private claimerRespondentSer: ClaimerRespondentService,
    private authRoleService: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.isSpinning = true;
    this.authRoleService.dispute$
      .pipe(
        switchMap((dispute) => {
          this.dispute = dispute;
          return this.termSheetSer.getAllTermSheet(dispute.id);
        })
      )
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.termSheetDetail = res;

        if (res.length) {
          this.termSheetSer.getAllTermSheetTitle().subscribe((res: any) => {
            this.termSheetTitles = [
              this.termSheetDetail[0],
              ...this.termSheetTitles,
              ...res,
            ];

            //setting default title
            this.termSheetTitles.unshift({
              ...this.termSheetDetail[0],
              title: 'Memorandum of Agreement',
            });

            //removing the duplicate entries
            this.termSheetTitles = [
              ...new Map(
                this.termSheetTitles.map((m) => [m.title, m])
              ).values(),
            ];
          });

          this.termSheetSer
            .getAllTermSheetSection(this.termSheetDetail[0].id)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (res: any) => {
                this.termSheetSectionTitles = res;

                this.termSheetSer
                  .getAllTermSheetSectionTitle()
                  .pipe(untilDestroyed(this))
                  .subscribe({
                    next: (res: any) => {
                      this.isSpinning = false;
                      this.termSheetSection = [];
                      this.termSheetSectionTitles.forEach(
                        (section: any, index: number) => {
                          this.termSheetSection.push([
                            this.defaultSectionTitles[index],
                            ...res,
                            section,
                          ]);
                        }
                      );

                      //removing duplicates
                      this.termSheetSection.forEach(
                        (section: any, index: number) => {
                          this.termSheetSection[index] = [
                            ...new Map(
                              section.map((m: any) => [m.title, m])
                            ).values(),
                          ];
                        }
                      );
                    },
                    error: () => {
                      this.isSpinning = false;
                    },
                  });
              },
              error: () => {
                this.isSpinning = false;
              },
            });

          this.isSignatureLoading = true;
          this.termSheetSer
            .getAllDigitalSignatures(this.termSheetDetail[0].id)
            .pipe(
              untilDestroyed(this),
              finalize(() => (this.isSignatureLoading = false))
            )
            .subscribe({
              next: (res: any) => {
                this.listOfSignatures = res;
              },
            });
        } else {
          this.isSpinning = false;
          this.notificationService.success('No Term Sheet Found.');
        }
      });

    this.librarySer
      .getAllClauses()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.clauseList = [];
          res.forEach((clause: any) => {
            this.clauseList.push({
              title: clause.title,
              content: clause.content.replace(/<[^>]*>/g, ''),
              value: clause,
            });
          });
        },
      });
  }

  openTemplate(): void {
    this.isVisible = true;
    // this.getFolderList('type__isnull=true&firm__isnull=true');
  }

  cancel() {
    this.isVisible = false;
  }

  sectionItemAdded(item: any) {
    this.termSheetSection.forEach((section: any) => {
      section.push(item);
    });
  }

  sectionItemDeleted(ind: any) {
    this.termSheetSection.forEach((section: any) => {
      section.splice(ind, 1);
    });
  }

  getFolderList(requestUrl: string) {
    this.enable = false;
    this.librarySer.getFilteredFolder(requestUrl).subscribe((res: any) => {
      this.folderList = res;
      this.enable = true;
      // this.createFileTreeStructure();
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  sectionUpdated(event: any) {
    this.sectionUpdateRequestBody.push(event);
  }

  printTermSheet() {
    window.print();
  }

  saveTermSheet() {
    let requestBody: any[] = [];

    let prevSectionId = -1;
    let ind = 0;

    this.sectionUpdateRequestBody.forEach((section: any) => {
      if (section.sectionId != prevSectionId) {
        requestBody.push(section);
        ++ind;
      } else {
        requestBody[ind - 1] = section;
      }
      prevSectionId = section.sectionId;
    });

    requestBody.forEach((requestBdy: any) => {
      this.termSheetSer
        .insertSectionText(requestBdy.sectionId, { text: requestBdy.text })
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.sectionUpdateRequestBody = [];
          },
        });
    });
  }

  checklistDrawerVisibility(status: boolean): void {
    this.drawerVisibility = status;
  }

  onSubmit(): void {
    this.termSheetSer
      .submitTermSheet({ dispute_code: this.dispute.code })
      .subscribe({
        next: (message: any) => {
          this.notificationService.success(message.message);
        },
        error: () => {
          this.notificationService.warning('Termsheet Submission Failed');
        },
      });
  }
}
