import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MapComponent } from './dashboard-page/map/map.component';
import { NewReportComponent } from './dashboard-page/new-report/new-report.component';
import { StatsComponent } from './dashboard-page/stats/stats.component';

const routes: Routes = [
  {
    path: '*',
    component: HomePageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'dashboard/mapa',
    component: MapComponent
  },
  {
    path: 'dashboard/denuncia',
    component: NewReportComponent
  },
  {
    path: 'dashboard/estadisticas',
    component: StatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
