import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-arbitrator-notes-input',
  templateUrl: './arbitrator-notes-input.component.html',
  styleUrls: ['./arbitrator-notes-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArbitratorNotesInputComponent {
  note = '';
  @Input() laneTypes: any = [];
  activeLane = 'issues';
}
