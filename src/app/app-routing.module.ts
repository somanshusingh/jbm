import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../app/signup/signup.component';
import { SigninComponent } from '../app/signin/signin.component';
import { VehicleComponent } from '../app/vehicle/vehicle.component'
import { HistoryComponent } from '../app/history/history.component'


const routes: Routes = [
  { path: 'signup', component:SignupComponent},
  { path: 'signin', component:SigninComponent},
  { path: 'vehicle', component:VehicleComponent},
  { path: 'history', component:HistoryComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
