import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Injectable,
  TemplateRef,
  ElementRef,
  Input,
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { CdTimerComponent } from 'angular-cd-timer/public-api';
import { Observable } from 'rxjs';
import { YyyyMmDdPipe } from 'src/app/shared/pipes/date/yyyy-mm-dd/yyyy-mm-dd.pipe';
import { BoardComponent } from '../../../note-board/pages/board/board.component';
import { TimeLogService } from '../../services/time-log.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormControl } from '@angular/forms';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@Injectable({
  providedIn: 'root',
})
export class PlenaryDeactivateGuard implements CanDeactivate<BoardComponent> {
  component!: Object;
  route!: ActivatedRouteSnapshot;

  constructor() {}

  canDeactivate(
    component: BoardComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log("component.PlenaryTimer.timer.get().timer ",component.PlenaryTimer.timer.get().timer)
    return component.PlenaryTimer.canExit();
  }
}
@UntilDestroy()
@Component({
  selector: 'plenary-timer',
  templateUrl: './plenary-timer.component.html',
  styleUrls: ['./plenary-timer.component.scss'],
})
export class PlenaryTimerComponent implements OnInit {
  isSpinning = false;
  isVisible: boolean = false;
  plenaryTimeId = -1;
  currentTimeLog: any = {};
  note: FormControl = new FormControl('');
  @Input() dispute!: any;

  @ViewChild('Notificationtemplate') Notificationtemplate!: TemplateRef<{}>;
  @ViewChild('timer') timer!: CdTimerComponent;
  constructor(
    private datePipe: YyyyMmDdPipe,
    private timelogSer: TimeLogService,
    private notification: NzNotificationService,
    private authRoleService: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.getRemainingDuration();
  }

  getRemainingDuration() {
    this.isSpinning = true;
    this.timelogSer
      .getRemainingDuration(this.dispute.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (remainingDuration: any) => {
          this.timer.countdown = true; // only a countdown timer if backend sends remaining_duration
          this.timer.startTime = remainingDuration.remaining_duration;
          this.timer.reset();
        },
        complete: () => {
          this.isSpinning = false;
        },
      });
  }

  canExit() {
    if (!!this.timer.get().timer) {
      this.notification.remove();
      this.notification.template(this.Notificationtemplate);
      return false;
    } else {
      return true;
    }
  }

  confirmExit() {
    this.timer.stop();
    this.notification.remove();
  }

  getCurrentTime() {
    let date = new Date();

    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hour = date.getHours();

    return `${hour}:${minutes}:${seconds}`;
  }

  get isPlenaryTimerStopped() {
    // on page load, timer is undefined
    return (
      this.timer != undefined &&
      !!!this.timer.get().timer &&
      this.plenaryTimeId == -1
    );
  }

  getTimer() {
    console.log(this.timer.get(), this.getCurrentTime());
  }

  onTickPlenary(e: any) {
    const every5Ticks = e.tick_count / 5;
    if (every5Ticks != 0 && every5Ticks % 1 === 0) {
      this.sendPlenaryTimerlog();
    }
  }

  stopPlenaryTimer(e: any) {
    this.sendPlenaryTimerlog(true);
  }

  beginTimer(e: Event) {
    this.timer.start();
    e.stopPropagation();
  }

  endTimer(e: Event) {
    this.timer.stop();
    e.stopPropagation();
  }

  sendPlenaryTimerlog(stop = false) {
    this.isSpinning = true;
    this.timelogSer
      .patchTimelogEntry(this.plenaryTimeId, {
        end_time: this.getCurrentTime(),
        stopped: stop,
        note: this.note.value,
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          if (!this.isVisible) this.note.patchValue(res.note);
        },
        complete: () => {
          this.isSpinning = false;
          if (stop) {
            // this.timer.reset()
            this.plenaryTimeId = -1;
            this.getRemainingDuration();
          }
        },
      });
  }
  startPlenaryTime(e: any) {
    this.isSpinning = true;
    let requestBody = {
      date: this.datePipe.transform(Date.now()),
      start_time: this.getCurrentTime(),
      type: 'P',
      dispute: this.dispute.id,
      creator: this.authRoleService.loggedUser.actor.id,
    };
    this.timelogSer
      .createTimelogEntry(requestBody)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.plenaryTimeId = res.id;
          this.currentTimeLog = res;
          this.note.patchValue(res.note);
          this.isSpinning = false;
        },
        error: () => {
          this.isSpinning = false;
        },
      });
  }

  showModal(): void {
    if (!this.isPlenaryTimerStopped) this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
