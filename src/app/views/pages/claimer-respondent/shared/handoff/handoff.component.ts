import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { AppService } from 'src/app/shared/services/app.service';
import { DisputeTabsService } from '../../../dispute/dispute-base/dispute-tabs.service';
import { User } from 'src/app/shared/interfaces/auth';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActorUtil } from 'src/app/shared/utils/actor';
import { Location } from '@angular/common';
import { DisputeService } from 'src/app/shared/services/dispute.service';
import { HandoffService } from './handoff-service/handoff.service';
import { summernoteConfig } from 'src/app/shared/configs/summernote';
import { SummerNote } from 'src/app/shared/interfaces/summernote';

@Component({
  selector: 'app-handoff',
  templateUrl: './handoff.component.html',
  styleUrls: ['./handoff.component.scss'],
})
export class HandoffComponent implements OnInit {
  dispute!: any;
  type = '';
  handOffForm!: FormGroup;
  draftText!: string;
  draftButton: string = 'save';
  emailDraft: any;
  loading: boolean = false;
  loadingDraft: boolean = true;

  editorConfig!: SummerNote;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private authRoleService: AuthRoleService,
    private disputeTabsService: DisputeTabsService,
    private notificationService: NotificationService,
    private location: Location,
    private disputeService: DisputeService,
    private handoffService: HandoffService
  ) {}

  get creatorFullName() {
    if (!this.dispute) return 'loading .....';
    return ActorUtil.fullname(this.dispute.creator);
  }

  ngOnInit(): void {
    this.editorConfig = summernoteConfig;
    this.editorConfig.height = 150;

    if (this.activatedRoute.snapshot.data['viewType'] == 'c') {
      this.type = 'claimer';
    } else {
      this.type = 'respondent';
    }

    //removing tabs from handoff screen
    this.disputeTabsService.tabs = [];

    this.authRoleService.dispute$.subscribe((dispute: any) => {
      this.dispute = dispute;
      const user = dispute[this.type];

      this.handoffService.getEmailDraft(user.id, this.dispute.id).subscribe({
        next: (res: any) => {
          if (res[0]) {
            this.emailDraft = res[0];
            this.draftText = this.emailDraft?.content;
          } else {
            this.draftText = `<p>
                                  Hi <b>${user.user.first_name} ${user.user.last_name}</b>,
                                </p>
                                <p>
                                  I <b>${this.creatorFullName}</b> will be helping you settle this dispute.
                                  This is the information of your case, please save this information as this is
                                  very important.
                                </p>`;
            this.createNewDraft(user);
          }
          this.loadingDraft = false;
          this.handOffForm.get('text')?.setValue(this.draftText);
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
      this.handOffForm = this.fb.group({
        dispute_code: new FormControl(dispute.code),
        dispute_type: new FormControl(dispute.type),
        invitation_link: new FormControl(user.invitation_url),
        creator_name: `${dispute.creator.user.first_name} ${dispute.creator.user.last_name}`,
        recipient: new FormGroup({
          name: new FormControl(
            `${user.user.first_name} ${user.user.last_name}`
          ),
          email: new FormControl([user.user.email]),
        }),
        title: `${this.type} handoff`,
        subject: `${this.type[0].toUpperCase()}${this.type.slice(
          1
        )} Invitation`,
        actor_type: `${this.type}`,
        text: this.draftText,
      });
    });
  }

  getTitle(): string {
    return `${this.type[0].toUpperCase()}${this.type.slice(
      1
    )}  has already signed up.`;
  }

  submit() {
    this.appService
      .sendInvitation(this.handOffForm.value)
      .subscribe((res: any) => {
        this.notificationService.success(`Invitation to ${this.type} sent.`);

        this.next();
      });
  }

  next() {
    if (this.type == 'respondent' || this.dispute.respondent == null) {
      this.router.navigate([`dispute/${this.dispute.id}/dashboard`]);

      //setting tabs for creator dashboard
      // this.authRoleService.getCurrentUser().subscribe((user: User) => {
      //   this.disputeTabsService.setUserTabs(user);

      //   if (this.dispute.respondent == null) {
      //     this.disputeTabsService.removeTab('respondent');
      //     this.disputeTabsService.removeTab('respondentme');
      //     this.disputeTabsService.removeTab('respondent-handoff');
      //   }

      //   if (
      //     this.dispute.claimer &&
      //     this.dispute.claimer.invitation_url == null
      //   ) {
      //     this.disputeTabsService.removeTab('claimer-handoff');
      //   }

      //   if (
      //     this.dispute.respondent &&
      //     this.dispute.respondent.invitation_url == null
      //   ) {
      //     this.disputeTabsService.removeTab('respondent-handoff');
      //   }
      // });
    } else {
      this.router.navigate([`/dispute/${this.dispute.id}/respondent-handoff`]);
    }
  }

  draftTextChanged(event: any) {
    this.draftText = event;
    this.handOffForm.get('text')?.setValue(event);
  }

  goBack(): void {
    this.location.back();
  }

  createNewDraft = (user: any) => {
    let emailDraftBody = {
      dispute: this.dispute.id,
      template_title: `${this.type} Handoff`,
      email_subject: `${this.type} Invitation`,
      actor: user.id,
      content: this.draftText,
    };

    this.handoffService.createEmailDraft(emailDraftBody).subscribe({
      next: (emailDraft) => {
        this.emailDraft = emailDraft;
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  toggleSaveEdit = () => {
    this.draftButton = this.draftButton == 'save' ? 'edit' : 'save';
    if (this.draftButton == 'save') {
      this.loading = true;
      let emailDraftBody = {
        content: this.draftText,
      };
      this.handoffService
        .saveEmailDraft(this.emailDraft.id, emailDraftBody)
        .subscribe({
          next: (emailDraft) => {
            this.emailDraft = emailDraft;
            this.loading = false;
            this.notificationService.success('Draft saved!');
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
        });
    }
  };
}
