import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { AuthRoleService } from '../../services/auth-role.service';
import { GlobalSearchService } from '../../services/global-search.service';
import { User, Actor } from '../../interfaces/auth';
import { NotificationService } from '../../services/notification.service';
import { ActorUtil } from '../../utils/actor';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  seachFieldOptions: any = {};
  actor!: Actor;
  enable: boolean = true;

  actorUtil = ActorUtil;

  constructor(
    private appSer: AppService,
    private authSer: AuthService,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
    public authRoleService: AuthRoleService,
    private globalSearchService: GlobalSearchService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.globalSearchService.seachFieldOptionsAsObservable$.subscribe(
      (data: any) => {
        console.log('search option in base', data);
        // if (data.placeHolder) this.enable = true;
        this.seachFieldOptions = data;
      }
    );

    this.authRoleService.getCurrentUser().subscribe(({ actor }: User) => {
      this.actor = actor;
    });
  }

  public onInput(event: any) {
    // this pushes the input value into the service's Observable.
    this.globalSearchService.searchTerm$.next(event.target.value);
  }

  signOut() {
    this.authSer.signOut().subscribe(() => {
      this.notificationService.success('Logged Out!');
      this.router.navigate(['/auth/login']);
    });
  }
}
