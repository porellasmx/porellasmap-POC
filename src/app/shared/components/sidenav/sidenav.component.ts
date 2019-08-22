import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  toggleSidenav: boolean;
  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.getSidenavStatus();
  }

  getSidenavStatus(): void {
    this.uiService.$toggleSidenav.subscribe(tgs => (this.toggleSidenav = tgs));
  }
}
