import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '*',
    component: HomePageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
