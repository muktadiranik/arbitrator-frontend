import { Component, OnInit } from '@angular/core';
import { Jobs } from 'src/app/shared/interfaces/jobs';
import { CareersPipe } from 'src/app/shared/pipes/filters/careers.pipe';
import { CareersService } from 'src/app/shared/services/careers.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  providers: [CareersPipe],
})
export class CareersComponent implements OnInit {
  size: 'large' | 'small' | 'default' = 'large';
  jobs: Jobs[] = [];
  isLoading: boolean = true;
  filterByTitle: string = '';
  filterByType: string = '';
  constructor(private careersService: CareersService) {}

  ngOnInit(): void {
    this.careersService.getJobs().subscribe({
      next: (jobs: any) => {
        this.jobs = jobs;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error retrieving jobs:', error);
        this.isLoading = false;
      },
    });
  }
}
