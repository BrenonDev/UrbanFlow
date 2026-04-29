import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { Missions } from './missions/missions';
import { Rewards } from './rewards/rewards';
import { Settings } from './settings/settings';

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: Welcome},
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'dashboard', component: Dashboard},
  {path: 'missions', component: Missions},
  {path: 'rewards', component: Rewards},
  {path: 'settings', component: Settings},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
