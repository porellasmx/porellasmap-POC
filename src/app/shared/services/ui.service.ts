import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private toggleSidenavSource = new BehaviorSubject(false);
  $toggleSidenav = this.toggleSidenavSource.asObservable();
  constructor() {}

  setToggleSidenav(flag: boolean): void {
    this.toggleSidenavSource.next(flag);
  }
}
