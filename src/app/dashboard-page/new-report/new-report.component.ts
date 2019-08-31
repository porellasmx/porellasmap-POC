import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {
  @ViewChild('placesRef', { static: false }) placesRef: GooglePlaceDirective;
  abuseList: string[];
  options = {
    types: ['address'],
    componentRestrictions: { country: 'mx' }
  };

  reportForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    placeName: new FormControl('', [Validators.required, , Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20)]),
    abuseType: new FormControl('', [Validators.required]),
    dateOfEvent: new FormControl('', [Validators.required]),
    locationLatLong: new FormControl('', [Validators.required]),
    imageName: new FormControl('', []) //Validators.required
  });
  constructor() {}

  ngOnInit() {
    this.buildAbuseList();
  }

  handleAddressChange(address: Address): void {
    console.log(address);
    this.reportForm.patchValue({
      address: address.formatted_address,
      placeName: address.name,
      locationLatLong: `Lat: ${address.geometry.location.lat()} Long: ${address.geometry.location.lng()}`
    });
    console.log(address.geometry.location.lng());
  }

  buildAbuseList(): void {
    this.abuseList = ['Sexual', 'Verbal', 'Psicologico', 'Fisico'];
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      console.log(this.reportForm.value);
      this.onReset();
    }
  }

  onReset(): void {
    this.reportForm.reset();
  }
}
