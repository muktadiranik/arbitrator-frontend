import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  A11y,
  Mousewheel,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper';
import { SwiperDirective } from '../../../directives/swiper.directive';
import { ddPipe } from '../../../pipes/date/dd/dd.pipe';
import { MMMdPipe } from '../../../pipes/date/MMM-dd/MMM-dd.pipe';

@Component({
  selector: 'claim-action-swiper',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, SwiperDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./claim-action-swiper.component.scss'],
  templateUrl: './claim-action-swiper.component.html',
  providers: [ddPipe, MMMdPipe],
})
export class ClaimActionSwiperComponent {
  @Input() timelineSteps: any = null;
  // @Input() content!: TemplateRef<any>;
  @Input() currentStep: number = 0;
  @Input() evidences: any;
  @Input() witnesses: any;
  @Input() notes: any;

  public config: SwiperOptions = {
    modules: [Navigation, Pagination, A11y, Mousewheel],
    autoHeight: true,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true, dynamicBullets: true },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    slidesPerView: 1,
    initialSlide: this.currentStep, // not working, its for selecting current slide based on current status
    centeredSlides: true,
    breakpoints: {
      400: {
        slidesPerView: 'auto',
        centeredSlides: false,
      },
    },
  };

  ngOnInit() {}

  constructor(public dateMonthDayPipe: MMMdPipe, public dateDayPipe: ddPipe) {}
}
