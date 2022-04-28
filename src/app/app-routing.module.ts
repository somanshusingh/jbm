import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../app/signup/signup.component';
import { SigninComponent } from '../app/signin/signin.component';
import { VehicleComponent } from '../app/vehicle/vehicle.component';
import { HistoryComponent } from '../app/history/history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  { path: 'signup', component:SignupComponent},
  { path: 'signin', component:SigninComponent},
  { path: 'vehicle', component:VehicleComponent},
  { path: 'history', component:HistoryComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: 'forgotPassword', component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
