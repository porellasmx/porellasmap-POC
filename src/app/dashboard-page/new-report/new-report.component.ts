import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapService } from 'src/app/shared/services/map.service';
import { Report } from 'src/app/shared/models/report.model';

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
    lat: new FormControl('', [Validators.required]),
    long: new FormControl('', [Validators.required]),
    imageName: new FormControl('', []) //Validators.required
  });
  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.buildAbuseList();
    this.getNewMarker();
  }

  handleAddressChange(address: Address): void {
    this.reportForm.patchValue({
      address: address.formatted_address,
      placeName: address.name,
      lat: address.geometry.location.lat(),
      long: address.geometry.location.lng()
    });

    this.mapService.setTempMarker({
      lat: address.geometry.location.lat(),
      long: address.geometry.location.lng(),
      animation: 'DROP',
      draggable: true
    });
  }

  buildAbuseList(): void {
    this.abuseList = ['Sexual', 'Verbal', 'Psicologico', 'Fisico'];
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      console.log(this.reportForm.value);
      const newReport = {
        address: this.reportForm.value.address,
        placeName: this.reportForm.value.address,
        description: this.reportForm.value.address,
        abuseType: this.reportForm.value.address,
        dateOfEvent: this.reportForm.value.dateOfEvent,
        marker: { lat: this.reportForm.value.lat, long: this.reportForm.value.long },
        imageName: this.reportForm.value.imageName
      };

      this.onReset();
    }
  }

  onReset(): void {
    this.reportForm.reset();
  }

  getNewMarker(): void {
    this.mapService.$tempMarker.subscribe(m => {
      if (m) {
        this.reportForm.patchValue({
          lat: m.lat,
          long: m.long
        });
      }
    });
  }
}
