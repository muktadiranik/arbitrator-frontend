import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TermSheetService } from '../../services/term-sheet.service';

@Component({
  selector: 'term-sheet-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent implements OnInit {
  @Input() selectedValue!: string;
  @Input() listOfItem!: any[];
  @Input() termSheetDetail: any;
  @Input() termSheetSectionDetail: any;

  @Output() itemAdded = new EventEmitter();
  @Output() itemDeleted = new EventEmitter();

  headingTitle = new FormControl('', Validators.required);
  index = 0;

  get HeadingFormControl() {
    return this.headingTitle;
  }

  constructor(
    private termSheetSer: TermSheetService,
    private changeDetect: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  addItem(): void {
    const value: string = <string>this.HeadingFormControl.value;

    if (this.termSheetDetail) {
      this.termSheetSer
        .addTermSheetTitle({ title: value })
        .subscribe((res: any) => {
          this.notificationService.success('Term Sheet Title Added.');
          this.listOfItem = [...this.listOfItem, res];
          this.HeadingFormControl.setValue('');
          this.changeDetect.detectChanges();
        });
    } else {
      this.termSheetSer
        .addSectionTitle({ title: value })
        .subscribe((res: any) => {
          this.notificationService.success('Section Title Added.');
          this.itemAdded.emit(res);
          this.HeadingFormControl.setValue('');
          this.changeDetect.detectChanges();
        });
    }
  }

  deleteOption(item: any, ind: number, event: any) {
    if (this.termSheetDetail) {
      this.termSheetSer.deleteTermSheetTitle(item.id).subscribe((res: any) => {
        this.notificationService.success('Term Sheet Title Deleted.');
        this.listOfItem.splice(ind, 1);
      });
    } else {
      this.termSheetSer.deleteSectionTitle(item.id).subscribe((res: any) => {
        this.notificationService.success('Section Title Deleted.');
        this.listOfItem.splice(ind, 1);
        this.itemDeleted.emit(ind);
      });
    }
  }

  titleChange(event: any) {
    console.log(this.termSheetDetail);
    if (this.termSheetDetail) {
      let requestBody = {
        title: event,
        dispute: this.termSheetDetail[0].dispute,
      };

      this.termSheetSer
        .updateSheetTitle(this.termSheetDetail[0].id, requestBody)
        .subscribe(() => {
          this.notificationService.success('Term Sheet Title Updated.');
        });
    } else {
      let requestBody = {
        title: this.selectedValue,
      };

      this.termSheetSer
        .updateSectionTitle(this.termSheetSectionDetail.id, requestBody)
        .subscribe((res) => {
          this.termSheetSectionDetail = res;
          this.notificationService.success('Section Title Updated.');
        });
    }
  }

  isFirst(ind: number) {
    return ind == 0;
  }
}
