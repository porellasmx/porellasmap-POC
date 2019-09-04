import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private toggleSidenavSource = new BehaviorSubject(false);
  $toggleSidenav = this.toggleSidenavSource.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  setToggleSidenav(flag: boolean): void {
    this.toggleSidenavSource.next(flag);
  }

  setSnackBar(message: string, time: number): void {
    this.snackBar.open(message, 'Undo', {
      duration: time
    });
  }
}
