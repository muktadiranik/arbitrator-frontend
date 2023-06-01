import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRoleService } from '../../services/auth-role.service';
import { RGBColors } from '../../enums/RGB-colors.enum';

@Component({
  selector: 'app-show-status',
  template: `
    <span
      [class]="animation"
      [ngClass]="{
        accepted: status == 'accepted',
        rejected: status == 'rejected',
        pending: status == 'pending',
        draft: status == 'draft',
        sent: status == 'sent',
        signed: status == 'signed',
        settled: status == 'settled',
        paid: status == 'paid',
        'not-paid': status == 'not-paid',
        'counter-offer': status == 'counter-offer'
      }"
      >{{ status | titlecase }}</span
    >
    <a
      *ngIf="
        (status == 'pending' || status == 'sent') &&
        authRoleService.userType == 'creator' &&
        dispute &&
        dispute[type]
      "
      nz-button
      class="text-centre"
      nzBlock
      nzType="link"
      style="padding: 0"
      (click)="sendHandoff()"
      ><span>Send Handoff</span></a
    >
  `,
  styles: [
    `
      .counter-offer,
      .rejected,
      .accepted,
      .pending,
      .draft,
      .sent,
      .signed,
      .settled,
      .paid,
      .not-paid {
        border-radius: 30px;
        padding: 0 8px;
      }

      .accepted,
      .signed,
      .settled,
      .sent,
      .paid {
        background: #c7e8d8;
        border: 1px solid #34a853;
        color: #34a853;
      }

      .counter-offer {
        background: #acd1fc;
        border: 1px solid #4285f4;
        color: #4285f4;
      }

      .rejected,
      .not-paid {
        background: #ffc6c1;
        border: 1px solid #ea4335;
        color: #ea4335;
      }

      .pending {
        background: #f6f6f6;
        border: 1px solid #bfbdbd;
        color: #5f6368;
      }

      .draft {
        background: #ffeebc;
        border: 1px solid #c99908;
        color: #c99908;
      }

      :host {
        --ripple-color: 194, 194, 194;
      }

      .ripple {
        cursor: pointer;
        animation: ripple 1.3s linear infinite;
        transition: all 0.7s ease;
      }
      @keyframes ripple {
        0% {
          box-shadow: 0 0 0 0 rgba(var(--ripple-color), 0.8),
            0 0 0 0px rgba(var(--ripple-color), 0.8),
            0 0 0 0px rgba(var(--ripple-color), 0.8),
            0 0 0 0px rgba(var(--ripple-color), 0.8);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(var(--ripple-color), 0.8),
            0 0 0 0px rgba(var(--ripple-color), 0.8),
            0 0 0 5px rgba(var(--ripple-color), 0),
            0 0 0 10px rgba(var(--ripple-color), 0);
        }
      }
    `,
  ],
})
export class ShowStatus implements OnInit {
  @Input() type?: any;
  @Input() dispute?: any;
  @Input() status = '';
  @Input() animation = '';
  @Input() animationColor = '';

  constructor(
    private router: Router,
    public authRoleService: AuthRoleService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.setAnimationColor();
  }

  sendHandoff() {
    this.router.navigate([`/dispute/${this.dispute.id}/${this.type}-handoff`]);
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
