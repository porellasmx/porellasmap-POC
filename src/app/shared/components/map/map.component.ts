import { Component, OnInit } from '@angular/core';
import { darkStyle } from './map-styles';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 19.432608;
  lng = -99.133209;
  style = darkStyle;
  constructor() {}

  ngOnInit() {}
}
