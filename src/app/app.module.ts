import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { DonationsPageComponent } from './donations-page/donations-page.component';
import { MapComponent } from './dashboard-page/map/map.component';
import { ContactPageComponent } from './dashboard-page/contact-page/contact-page.component';

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
    ContactPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
