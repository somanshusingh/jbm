import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../app/signup/signup.component';
import { SigninComponent } from '../app/signin/signin.component';
import { VehicleComponent } from '../app/vehicle/vehicle.component';
import { HistoryComponent } from '../app/history/history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MenuComponent } from './menu/menu.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { UsersComponent } from './users/users.component';
import { OutboundDashboardComponent } from './outbound-dashboard/outbound-dashboard.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
  { path: '', component:SigninComponent},
  { path: 'signup', component:MenuComponent},
  { path: 'signin', component:SigninComponent},
  { path: 'vehicle', component:MenuComponent},
  { path: 'history', component:HistoryComponent},
   { path: 'dashboard', component:MenuComponent},
  { path: 'forgotPassword', component:ForgotPasswordComponent},
  { path: 'menu', component:MenuComponent},
  { path: 'users', component:MenuComponent},
  { path: 'outbound', component:MenuComponent},
  { path: 'outBoundDashboard', component:MenuComponent},
  { path: 'inBoundDashboard', component:MenuComponent},
  { path: 'inBound', component:MenuComponent},
  { path: 'inBound/inhouse', component:MenuComponent},
  { path: 'report',component:MenuComponent},
  { path: '**', component:ErrorpageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
