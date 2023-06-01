import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../../job-description/services/job.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss'],
})
export class JobPostComponent implements OnInit {
  jobPostForm!: FormGroup;
  opportunities: any[] = [];
  requirements: any[] = [];
  isAddingOpportunity = false;
  isAddingRequirement = false;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.jobPostForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      position: [null, [Validators.required]],
      employmentType: [null, [Validators.required]],
      linkedInUrl: [null],
      opportunities: [[], [Validators.required]],
      requirements: [[], [Validators.required]],
    });

    this.jobService.getJobDetails().subscribe({
      next: (details: any) => {
        this.opportunities = [];
        this.requirements = [];

        for (const detail of details) {
          if (detail.type === 'Opportunity') {
            this.opportunities.push(detail);
          } else if (detail.type === 'Requirement') {
            this.requirements.push(detail);
          }
        }
      },
      error: (msg: any) => {
        this.notificationService.error(msg);
      },
    });
  }

  submitForm(): void {
    if (this.jobPostForm.valid) {
      console.log([this.jobPostForm.value.opportunities.join(',')]);

      const requestBody = {
        title: this.jobPostForm.value.title,
        description: this.jobPostForm.value.description,
        position: this.jobPostForm.value.position,
        employment_type: this.jobPostForm.value.employmentType,
        linked_in_url: this.jobPostForm.value.linkedInUrl,
        details: [
          ...this.jobPostForm.value.opportunities,
          ...this.jobPostForm.value.requirements,
        ],
      };

      this.jobService.postJob(requestBody).subscribe(() => {
        this.notificationService.success(`Job created successfully!`);
        this.jobPostForm.reset();
      });
    }
  }

  addOpportunity(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (value) {
      const opportunity = {
        text: value,
        type: 'Opportunity',
      };

      this.isAddingOpportunity = true;

      this.jobService.postJobDetails(opportunity).subscribe({
        next: (response: any) => {
          this.notificationService.success(`Opportunity added successfully!`);
          this.opportunities.push(response);
          inputElement.value = '';
          this.isAddingOpportunity = false;
        },
        error: (error: any) => {
          this.notificationService.error('Failed to add opportunity.');
          console.log(error);
          this.isAddingOpportunity = false;
        },
      });
    }
  }

  addRequirement(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (value) {
      const requirement = {
        text: value,
        type: 'Requirement',
      };

      this.isAddingRequirement = true;

      this.jobService.postJobDetails(requirement).subscribe({
        next: (response: any) => {
          this.notificationService.success(`Requirement added successfully!`);
          this.requirements.push(response);
          inputElement.value = '';
          this.isAddingRequirement = false;
        },
        error: (error: any) => {
          this.notificationService.error('Failed to add requirement.');
          console.log(error);
          this.isAddingRequirement = false;
        },
      });
    }
  }
}
