import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/shared/services/map.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map-dash',
  templateUrl: './map-dash.component.html',
  styleUrls: ['./map-dash.component.scss']
})
export class MapDashComponent implements OnInit {
  $reports: Observable<any>;
  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.setReports();
  }

  setReports(): void {
    this.$reports = this.mapService.getReportsDB();
  }
}
