import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MMDdYyyyPipe } from 'src/app/shared/pipes/date/mm-dd-yyyy/mm-dd-yyyy.pipe';
import { TimePipe } from 'src/app/shared/pipes/time/time.pipe';
import { AppService } from 'src/app/shared/services/app.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TermSheetService } from '../../services/term-sheet.service';

@Component({
  selector: 'digital-signature',
  templateUrl: './digital-signature.component.html',
  styleUrls: ['./digital-signature.component.scss'],
})
export class DigitalSignatureComponent implements OnInit {
  @Input() termSheetDetail: any;
  @Input() listOfSignatures: any;

  signatures!: FormGroup;
  items!: FormArray;

  isButtonLoading = false;

  constructor(
    private fb: FormBuilder,
    private timePipe: TimePipe,
    private datePipe: MMDdYyyyPipe,
    private appService: AppService,
    private termSheetSer: TermSheetService,
    private notificationService: NotificationService
  ) {
    this.signatures = new FormGroup({
      items: new FormArray([]),
    });
  }

  ngOnInit(): void {
    if (this.listOfSignatures.length) {
      this.items = this.signatures.get('items') as FormArray;
      this.listOfSignatures.forEach((signature: any, ind: number) => {
        this.items.push(this.fb.group(signature));
        this.getItemsControls().at(ind)?.disable();
      });

      this.items.push(this.createItem());
    } else {
      this.items = this.signatures.get('items') as FormArray;
      this.items.push(this.createItem());
    }

    // this.appService.getPrintAlert().subscribe((status: any) => {
    //   this.items = this.signatures.get('items') as FormArray;
    //   if (status) {
    //     this.items.push(this.createItem());
    //   } else {
    //     this.items.removeAt(this.items.length - 1);
    //   }
    // });
  }

  getItemsControls() {
    return (this.signatures.get('items') as FormArray).controls;
  }

  checkValidity(ind: number) {
    return this.getItemsControls().at(ind)?.valid;
  }

  createItem() {
    return this.fb.group({
      text: new FormControl('', Validators.required),
      created_at: '',
      id: -1,
      termsheet: -1,
      updated_at: '',
    });
    //  return  new FormControl('', Validators.required)
  }

  addSignature(ind: number) {
    let requestBody = {
      termsheet: this.termSheetDetail[0].id,
      text: this.getItemsControls().at(ind)?.value.text,
    };

    this.isButtonLoading = true;
    this.termSheetSer.addDigitalSignature(requestBody).subscribe({
      next: (res: any) => {
        this.isButtonLoading = false;
        this.getItemsControls().at(ind)?.setValue(res);
        this.getItemsControls().at(ind)?.disable();

        this.items.push(this.createItem());

        this.notificationService.success('Digital Signature Added.');
      },
      error: () => {
        this.isButtonLoading = false;
      },
    });
  }

  getSignatureDate(ind: number) {
    if (this.getItemsControls().at(ind)?.value.created_at != '') {
      return this.datePipe.transform(
        this.getItemsControls().at(ind)?.value.created_at
      );
    }
  }

  getSignatureTime(ind: number) {
    return this.timePipe.transform(
      this.getItemsControls().at(ind)?.value.created_at
    );
  }

  enableButton(ind: number) {
    return ind == this.getItemsControls().length - 1;
  }

  isLast(ind: number) {
    return ind != this.getItemsControls().length - 1;
  }
}
