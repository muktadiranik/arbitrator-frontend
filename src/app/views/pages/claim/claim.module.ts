import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimDescriptionComponent } from './claim-description/claim-description.component';
import { ClaimTimelineComponent } from './claim-timeline/claim-timeline.component';

@NgModule({
  declarations: [ClaimDescriptionComponent, ClaimTimelineComponent],
  imports: [CommonModule],
})
export class ClaimModule {}
