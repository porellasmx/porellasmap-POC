import { Injectable } from '@angular/core';
import { Report } from '../models/report.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marker } from '../models/marker.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private newReportSource = new BehaviorSubject<Report>(null);
  $newReport = this.newReportSource.asObservable();

  private tempMarkerSource = new BehaviorSubject<Marker>(null);
  $tempMarker = this.tempMarkerSource.asObservable();
  constructor(private http: HttpClient) {}

  setNewReport(report: Report) {
    this.newReportSource.next(report);
  }

  setTempMarker(marker: Marker) {
    this.tempMarkerSource.next(marker);
  }

  addReport(report: Report): Observable<Report> {
    return null; //this.http.post();
  }

  getReports(): Observable<Report[]> {
    return null;
  }

  getReport(reportID: number): Observable<Report> {
    return null;
  }

  updateReport(report: Report): Observable<Report> {
    return null;
  }

  deleteReport(reportID: number): Observable<Report> {
    return null;
  }
}
