import { Component, OnInit } from '@angular/core';
import { darkStyle } from './map-styles';
import { Observable } from 'rxjs';
import { Marker } from '../../models/marker.model';
import { MapService } from '../../services/map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 19.432608;
  lng = -99.133209;
  style = darkStyle;
  $newMarker: Observable<Marker>;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.getNewMarker();
  }

  getNewMarker(): void {
    this.$newMarker = this.mapService.$tempMarker;
  }

  markerDragEnd(marker: Marker, $event: MouseEvent) {
    console.log('dragEnd', marker, $event);
  }

  markerOver(marker: Marker) {
    marker.animation = 'BOUNCE';
  }

  markerOut(marker: Marker) {
    marker.animation = '';
  }

  mapClicked($event: any) {
    const newMarker = {
      lat: $event.coords.lat,
      long: $event.coords.lng,
      draggable: true,
      animation: 'DROP'
    };

    this.mapService.setTempMarker(newMarker);
  }
}
