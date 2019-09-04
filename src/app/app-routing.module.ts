import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MapComponent } from './shared/components/map/map.component';
import { NewReportComponent } from './dashboard-page/new-report/new-report.component';
import { StatsComponent } from './dashboard-page/stats/stats.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { MapDashComponent } from './dashboard-page/map-dash/map-dash.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomePageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'dashboard/mapa',
    component: MapDashComponent
  },
  {
    path: 'dashboard/denuncia',
    component: NewReportComponent
  },
  {
    path: 'dashboard/estadisticas',
    component: StatsComponent
  },
  {
    path: 'reporte/:id',
    component: ReportDetailsComponent
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: '*',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
