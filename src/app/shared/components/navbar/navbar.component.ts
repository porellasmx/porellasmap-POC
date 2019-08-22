import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  flag: boolean;
  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.getSidenavStatus();
  }

  getSidenavStatus(): void {
    this.uiService.$toggleSidenav.subscribe(f => (this.flag = f));
  }

  onToggleSidenav(): void {
    this.uiService.setToggleSidenav(!this.flag);
  }
}
