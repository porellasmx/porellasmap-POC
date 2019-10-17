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
    imageName: new FormControl('', []) //Validators.required
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
      const newReport = {
        address: this.reportForm.value.address,
        placeName: this.reportForm.value.placeName,
        description: this.reportForm.value.description,
        abuseType: this.reportForm.value.abuseType,
        dateOfEvent: this.reportForm.value.dateOfEvent,
        timeOfEvent: this.reportForm.value.timeOfEvent,
        marker: { lat: this.reportForm.value.lat, long: this.reportForm.value.long },
        imageName: this.reportForm.value.imageName,
        zipcode: this.reportForm.value.zipcode,
        state: this.reportForm.value.state,
        city: this.reportForm.value.city,
        country: this.reportForm.value.country
      };

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

  ngOnDestroy() {
    this.tempMarkerSubscription.unsubscribe();
    this.addReportSubscription.unsubscribe();
  }
}
