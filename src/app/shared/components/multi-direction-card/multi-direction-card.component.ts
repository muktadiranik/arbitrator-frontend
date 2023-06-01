import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { RGBColors } from '../../enums/RGB-colors.enum';
@Component({
  selector: 'app-multi-direction-card',
  templateUrl: './multi-direction-card.component.html',
  styleUrls: ['./multi-direction-card.component.scss'],
})
export class MultiDirectionCardComponent implements OnInit {
  @Input() imgClass: string = '';
  @Input() titleClass: string = 'avatar-information-title';
  @Input() descriptionClass: string = 'avatar-information-description';
  @Input() headingClass: string = 'default-heading';

  @Input() imageURL: string = '';
  @Input() alt: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  @Input() size: string = this.direction == 'horizontal' ? 'w-20' : 'w-24';
  // @Input() size: string = 'w-20';
  @Input() animation: string = '';
  @Input() animationColor: string = '';
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setAnimationColor();
  }

  get imageClasses(): string {
    return `${this.size} ${this.imgClass} ${this.animation}`;
  }

  setAnimationColor = () => {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    const rippleColor = Object.keys(RGBColors)
      .filter((k): k is keyof typeof RGBColors => k === this.animationColor)
      .map((k) => RGBColors[k])[0];
    if (rippleColor)
      hostElement.style.setProperty('--ripple-color', rippleColor);
  };
}
