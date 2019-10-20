import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapService } from 'src/app/shared/services/map.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from 'src/app/shared/services/ui.service';
import { PlacesService } from 'src/app/shared/services/places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit, OnDestroy {
  @ViewChild('placesRef', { static: false }) placesRef: GooglePlaceDirective;
  abuseList: string[];
  options = {
    types: ['establishment'],
    componentRestrictions: { country: 'mx' }
  };
  flagNA = false;
  private tempMarkerSubscription: Subscription;
  private addReportSubscription: Subscription;

  reportForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    placeName: new FormControl('', [Validators.required, , Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20)]),
    abuseType: new FormControl('', [Validators.required]),
    dateOfEvent: new FormControl('', [Validators.required]),
    timeOfEvent: new FormControl('', [Validators.required]),
    lat: new FormControl('', [Validators.required]),
    long: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    image: new FormControl(null, []) //Validators.required
  });
  constructor(
    private mapService: MapService,
    private uiService: UiService,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.buildAbuseList();
    this.getNewMarker();
  }

  handleAddressChange(address: Address): void {
    this.reportForm.patchValue({
      address: address.formatted_address,
      placeName: address.name,
      lat: address.geometry.location.lat(),
      long: address.geometry.location.lng(),
      zipcode: this.placesService.getPlaceTypeValue(address.address_components, 'postal_code'),
      state: this.placesService.getPlaceTypeValue(
        address.address_components,
        'administrative_area_level_1'
      ),
      city: this.placesService.getPlaceTypeValue(address.address_components, 'locality'),
      country: this.placesService.getPlaceTypeValue(address.address_components, 'country')
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
      const newReport = new FormData();
      newReport.append('address', this.reportForm.value.address);
      newReport.append('placeName', this.reportForm.value.placeName);
      newReport.append('description', this.reportForm.value.description);
      newReport.append('abuseType', this.reportForm.value.abuseType);
      newReport.append('dateOfEvent', this.reportForm.value.dateOfEvent);
      newReport.append('timeOfEvent', this.reportForm.value.timeOfEvent);
      newReport.append('lat', this.reportForm.value.lat);
      newReport.append('long', this.reportForm.value.long);
      newReport.append('image', this.reportForm.value.image, this.reportForm.value.image.name);
      newReport.append('zipcode', this.reportForm.value.zipcode);
      newReport.append('state', this.reportForm.value.state);
      newReport.append('city', this.reportForm.value.city);
      newReport.append('country', this.reportForm.value.country);
      this.addReportSubscription = this.mapService.addReport(newReport).subscribe(report => {
        this.uiService.setSnackBar(report.message, 3000);
        this.onReset();
        this.mapService.setTempMarker(null);
      });
    }
  }

  onReset(): void {
    this.reportForm.reset();
  }

  getNewMarker(): void {
    this.tempMarkerSubscription = this.mapService.$tempMarker.subscribe(m => {
      if (m) {
        this.reportForm.patchValue({
          lat: m.lat,
          long: m.long
        });
      }
    });
  }

  addressNA(): void {
    this.flagNA = !this.flagNA;
    if (this.flagNA) {
      this.reportForm.patchValue({
        address: 'N/A'
      });
    } else {
      this.reportForm.patchValue({
        address: ''
      });
    }
  }

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    console.log(FILE);
    this.reportForm.patchValue({ image: FILE });
    this.reportForm.get('image').updateValueAndValidity();
  }

  ngOnDestroy() {
    this.tempMarkerSubscription.unsubscribe();
    this.addReportSubscription.unsubscribe();
  }
}
