import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-address-subform',
  templateUrl: './address-subform.component.html',
  styleUrls: ['./address-subform.component.scss'],
})
export class AddressSubformComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  addressFormGroup!: FormGroup;

  ngOnInit(): void {}

  createAddressFormGroup(): FormGroup {
    this.addressFormGroup = this.fb.group({
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      zip: new FormControl(null, [Validators.required]),
    });

    return this.addressFormGroup;
  }
}
