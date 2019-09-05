import { Injectable, OnDestroy } from '@angular/core';
import { Report } from '../models/report.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Marker } from '../models/marker.model';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { ReportAPI } from '../models/report-api.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private newReportSource = new BehaviorSubject<Report>(null);
  $newReport = this.newReportSource.asObservable();

  private tempMarkerSource = new BehaviorSubject<Marker>(null);
  $tempMarker = this.tempMarkerSource.asObservable();

  private reportsSource = new BehaviorSubject<Report[]>(null);
  $reports = this.reportsSource.asObservable();

  BASE_URL = 'http://localhost:3000/api/reports';

  constructor(private http: HttpClient) {}

  setNewReport(report: Report) {
    this.newReportSource.next(report);
  }

  setTempMarker(marker: Marker) {
    this.tempMarkerSource.next(marker);
  }

  addReport(report: Report): Observable<ReportAPI> {
    return this.http.post<ReportAPI>(this.BASE_URL, report);
  }

  getReportsDB(): Observable<ReportAPI> {
    return this.http.get<ReportAPI>(this.BASE_URL);
  }

  setReports(reports: Report[]): void {
    this.reportsSource.next(reports);
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
