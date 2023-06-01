import {
  AfterViewInit,
  Component,
  Injectable,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { CdTimerComponent } from 'angular-cd-timer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { YyyyMmDdPipe } from 'src/app/shared/pipes/date/yyyy-mm-dd/yyyy-mm-dd.pipe';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { GlobalSearchService } from 'src/app/shared/services/global-search.service';
import { BoardComponent } from '../../../note-board/pages/board/board.component';
import { TimeLogService } from '../../services/time-log.service';

@Injectable({
  providedIn: 'root',
})
export class CaucusDeactivateGuard implements CanDeactivate<BoardComponent> {
  component!: Object;
  route!: ActivatedRouteSnapshot;

  constructor() {}

  canDeactivate(
    component: BoardComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.CaucusTimer.canExit();
  }
}

interface Participant {
  id: number | string;
  name: string;
  enable: boolean;
  type: string;
  color: string;
}
@Component({
  selector: 'caucus-timer',
  templateUrl: './caucus-timer.component.html',
  styleUrls: ['./caucus-timer.component.scss'],
})
export class CaucusTimerComponent implements OnInit, AfterViewInit {
  @Input() dispute!: any;
  isSpinning = false;
  isVisible: boolean = false;
  visibility: boolean = false;
  caucusTimerId = -1;
  currentTimeLog: any = {};
  note: FormControl = new FormControl('');

  // activeParticipant: string | number = -1;
  activeParticipant: { id: number | string; type: string; color: string } = {
    id: '',
    type: '',
    color: '',
  };

  claimer: Participant = {
    id: '',
    name: '',
    enable: true,
    type: 'C',
    color: '#87d068',
  };

  respondent: Participant = {
    id: '',
    name: '',
    enable: true,
    type: 'R',
    color: '#2db7f5',
  };

  @ViewChild('Notificationtemplate') Notificationtemplate!: TemplateRef<{}>;
  @ViewChild('caucustimer') timer!: CdTimerComponent;

  get isCaucusTimerStopped() {
    // on page load, timer is undefined
    return (
      this.timer != undefined &&
      !!!this.timer.get().timer &&
      this.caucusTimerId == -1
    );
  }

  constructor(
    public authRoleService: AuthRoleService,
    private datePipe: YyyyMmDdPipe,
    private timelogSer: TimeLogService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    let claimer = this.dispute.claimer;
    let respondent = this.dispute.respondent;
    this.claimer.id = claimer.id;
    this.claimer.name = `${claimer.user.first_name} ${claimer.user.last_name}`;

    this.respondent.id = respondent.id;
    this.respondent.name = `${respondent.user.first_name} ${respondent.user.last_name}`;
  }

  ngAfterViewInit() {
    this.timer.reset();
    // this.timer.autoStart = false
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

  onTickCaucus(e: any) {
    const every5Ticks = e.tick_count / 5;
    // console.log('ontick', every5Ticks, e.tick_count/5, e, every5Ticks % 1 === 0)
    if (every5Ticks != 0 && every5Ticks % 1 === 0) {
      this.sendCaucusTimerlog();
    }
  }

  stopCaucusTimer(e: any) {
    this.sendCaucusTimerlog(true);
  }

  beginTimer(e: Event, participant: Participant) {
    this.visibility = false;

    this.activeParticipant.id = participant.id;
    this.activeParticipant.type = participant.type;
    this.activeParticipant.color = participant.color;

    this.timer.start();
    e.stopPropagation();
  }

  endTimer(e: Event) {
    this.activeParticipant.type = '';
    this.timer.stop();
    e.stopPropagation();
  }
  sendCaucusTimerlog(stop = false) {
    this.isSpinning = true;
    this.timelogSer
      .patchTimelogEntry(this.caucusTimerId, {
        end_time: this.getCurrentTime(),
        stopped: stop,
        note: this.note.value,
      })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (!this.isVisible) this.note.patchValue(res.note);
        },
        complete: () => {
          this.isSpinning = false;
          if (stop) {
            this.timer.reset();
            this.caucusTimerId = -1;
          }
        },
      });
  }

  startCaucusTime(e: any) {
    console.log(this.activeParticipant);

    // this.isSpinning = true;
    let requestBody = {
      date: this.datePipe.transform(Date.now()),
      start_time: this.getCurrentTime(),
      type: 'C',
      dispute: this.dispute.id,
      creator: this.authRoleService.loggedUser.actor.id,
      participant: this.activeParticipant.id,
    };

    this.timelogSer.createTimelogEntry(requestBody).subscribe({
      next: (res: any) => {
        this.caucusTimerId = res.id;
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
    if (!this.isCaucusTimerStopped) this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
