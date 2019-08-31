import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

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
  constructor() {}

  ngOnInit() {
    this.buildAbuseList();
  }

  handleAddressChange(address: Address) {
    console.log(address.geometry.location.lng());
  }

  buildAbuseList(): void {
    this.abuseList = ['Sexual', 'Verbal', 'Psicologico', 'Fisico'];
  }
}
