import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDashComponent } from './map-dash.component';

describe('MapDashComponent', () => {
  let component: MapDashComponent;
  let fixture: ComponentFixture<MapDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
