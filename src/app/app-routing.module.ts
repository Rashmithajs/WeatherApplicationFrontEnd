import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { WeatherModalComponent } from './weather-modal/weather-modal.component';


const routes: Routes = [
{ path: '', component: WelcomeComponent },
// { path: 'weather/:city', component: WeatherModalComponent },
// { path: 'Search', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
