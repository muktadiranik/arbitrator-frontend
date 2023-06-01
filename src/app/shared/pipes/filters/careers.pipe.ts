import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'careers',
})
export class CareersPipe implements PipeTransform {
  transform(jobs: any[], filterByTitle: string, filterByType: string): any[] {
    if (!jobs) {
      return [];
    }

    let filteredJobs = [...jobs];

    if (filterByTitle && filterByTitle !== 'All Contracts') {
      filteredJobs = filteredJobs.filter(
        (job) => job.employment_type === filterByTitle
      );
    }

    if (filterByType && filterByType !== 'All Type') {
      filteredJobs = filteredJobs.filter(
        (job) => job.position === filterByType
      );
    }

    return filteredJobs;
  }
}
