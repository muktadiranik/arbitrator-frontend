import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobService } from './services/job.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { YyyyMmDdPipe } from 'src/app/shared/pipes/date/yyyy-mm-dd/yyyy-mm-dd.pipe';
import { Location } from '@angular/common';
import { differenceInCalendarDays } from 'date-fns';
import { finalize } from 'rxjs';
import { Jobs } from 'src/app/shared/interfaces/jobs';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss'],
})
export class JobDescriptionComponent implements OnInit {
  size: 'default' | 'small' | 'large' = 'large';
  job!: Jobs;

  start_date: any = null;
  end_date: any = null;
  disableEndDate: boolean = false;
  checkboxValue: boolean = false;
  isLoading: boolean = false;
  isButtonLoading: boolean = false;
  applicationId!: number;

  jobApplicationForm: FormGroup;

  get experience(): FormArray {
    return this.jobApplicationForm.get('experience') as FormArray;
  }

  get experienceControls() {
    return (this.jobApplicationForm.get('experience') as FormArray).controls;
  }

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.start_date) < 0;
  };

  trackByFn(index: any, item: any) {
    return index;
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private jobService: JobService,
    private datePipe: YyyyMmDdPipe,
    private notificationService: NotificationService
  ) {
    this.jobApplicationForm = this.fb.group({
      opening: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.required]),
      cover_letter: new FormControl('', [Validators.required]),
      experience: this.fb.array([this.newExperience()]),
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(({ params }: any) => {
      if (params && params.id) {
        this.jobApplicationForm.get('opening')?.patchValue(Number(params.id));

        this.jobService
          .getJobDescription(params.id)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe((job: any) => {
            this.job = job;
          });
      } else {
        this.isLoading = false;
      }
    });
  }

  checkValidity(): boolean {
    const controls = this.jobApplicationForm.controls;
    for (const name in controls) {
      if (controls[name].invalid && name != 'experience') {
        return true;
      }
    }
    return false;
  }

  onChange(val: any, type: string): void {
    const control = this.experienceControls.at(
      this.experienceControls.length - 1
    );

    switch (type) {
      case 'startDate':
        control?.get('start_date')?.patchValue(this.datePipe.transform(val));
        break;

      case 'endDate':
        control?.get('end_date')?.patchValue(this.datePipe.transform(val));
        break;

      case 'checkbox_change':
        control?.get('currently_working')?.patchValue(val);
        if (val) {
          this.disableEndDate = true;
          this.end_date = null;
          control?.get('end_date')?.clearValidators();
          control?.get('end_date')?.updateValueAndValidity();
        } else {
          this.disableAndSetValidator(control);
        }
        break;
    }
  }

  disableAndSetValidator(control: any): void {
    this.disableEndDate = false;
    control?.get('end_date')?.setValidators([Validators.required]);
    control?.get('end_date')?.updateValueAndValidity();
  }

  newExperience(): FormGroup {
    return this.fb.group({
      application: new FormControl(this.applicationId),
      job_title: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      currently_working: new FormControl(false, [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  addExperience(state: boolean = true): void {
    const control = this.experienceControls.at(
      this.experienceControls.length - 1
    );

    if (control?.valid) {
      //setting application id
      control.get('application')?.patchValue(this.applicationId);

      if (this.disableEndDate) {
        delete control?.value['end_date'];
      }

      this.isButtonLoading = true;
      this.jobService
        .submitExperience(control?.value)
        .pipe(finalize(() => (this.isButtonLoading = false)))
        .subscribe(() => {
          this.notificationService.success('Experience Added.');
          this.experience.push(this.newExperience());
          this.start_date = null;
          this.end_date = null;
          this.checkboxValue = false;
          this.disableAndSetValidator(control);
        });
    } else if (state) {
      this.submitForReview(this.applicationId);
    }
  }

  submitApplication(state: boolean = true): void {
    if (!this.applicationId) {
      // application hasnt created yet

      let requestBody: any = {};

      const controls = this.jobApplicationForm.controls;
      for (const name in controls) {
        if (name != 'experience') {
          requestBody[name] = controls[name].value;
        }
      }

      this.isButtonLoading = true;
      this.jobService
        .submitApplication(requestBody)
        .pipe(finalize(() => (this.isButtonLoading = false)))
        .subscribe((application: any) => {
          this.applicationId = application.id;
          this.notificationService.success('Application Submitted.');

          this.addExperience();
        });
    } else if (state) {
      this.submitForReview(this.applicationId);
    }
  }

  submitForReview(applicationId: number): void {
    this.isButtonLoading = true;
    this.jobService
      .submitForReview({ application_id: applicationId })
      .pipe(finalize(() => (this.isButtonLoading = false)))
      .subscribe({
        next: (res: any) => {
          this.notificationService.success(res.message);
          this.location.back();
        },
      });
  }
}
