import { Component, OnInit } from '@angular/core';
import { darkStyle } from './map-styles';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  style = darkStyle;
  constructor() {}

  ngOnInit() {}
}
