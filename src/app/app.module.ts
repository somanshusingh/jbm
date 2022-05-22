import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HistoryComponent } from './history/history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MenuComponent } from './menu/menu.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { UsersComponent } from './users/users.component';
import { OutboundDashboardComponent } from './outbound-dashboard/outbound-dashboard.component';
import { InboundDashboardComponent } from './inbound-dashboard/inbound-dashboard.component';
import { InboundComponent } from './inbound/inbound.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    VehicleComponent,
    HistoryComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    MenuComponent,
    ErrorpageComponent,
    UsersComponent,
    OutboundDashboardComponent,
    InboundDashboardComponent,
    InboundComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
