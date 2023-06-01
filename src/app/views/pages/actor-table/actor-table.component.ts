import { Component, Input } from '@angular/core';
import { MMDdYyyyPipe } from 'src/app/shared/pipes/date/mm-dd-yyyy/mm-dd-yyyy.pipe';
import { AuthRoleService } from 'src/app/shared/services/auth-role.service';
import { ActorUtil } from 'src/app/shared/utils/actor';
import { DateUtil } from 'src/app/shared/utils/date';

@Component({
  selector: 'actor-table',
  templateUrl: './actor-table.component.html',
  styleUrls: ['./actor-table.component.scss'],
})
export class ActorTableComponent {
  @Input() actors: any[] = [];
  actorUtil = ActorUtil;
  dateUtil = DateUtil;
  @Input() isloading = true;
  @Input() tableName!: string;
  constructor(public datePipe: MMDdYyyyPipe) {}

  replaceDash(date: any) {
    console.log(date);
    return date.replace(/-/g, '/');
  }

  getColorByType(creator: any) {
    switch (creator?.type) {
      case 'respondent':
        return 'blue';
      case 'claimer':
        return 'green';
      case 'arbitrator':
        return 'yellow';
      case 'creator':
        return 'red';
      case 'witness':
        return 'purple';
      default:
        return '';
    }
  }
}
