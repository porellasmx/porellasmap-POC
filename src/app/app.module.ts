import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';

/* App components */
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { DonationsPageComponent } from './donations-page/donations-page.component';
import { MapComponent } from './dashboard-page/map/map.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { NewsDashboardComponent } from './news-page/news-dashboard/news-dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { NewReportComponent } from './dashboard-page/new-report/new-report.component';
import { StatsComponent } from './dashboard-page/stats/stats.component';
import { ReportDetailsComponent } from './report-details/report-details.component';

/*MDB Modules */
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DashboardPageComponent,
    StorePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    NewsPageComponent,
    DonationsPageComponent,
    MapComponent,
    ContactPageComponent,
    NewsDashboardComponent,
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    NewReportComponent,
    StatsComponent,
    ReportDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
