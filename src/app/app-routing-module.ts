import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { Missions } from './missions/missions';
import { Rewards } from './rewards/rewards';
import { Settings } from './settings/settings';
import { AuthGuard, PublicGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: Welcome, canActivate: [PublicGuard]},
  {path: 'login', component: Login, canActivate: [PublicGuard]},
  {path: 'signup', component: Signup, canActivate: [PublicGuard]},
  {path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
  {path: 'missions', component: Missions, canActivate: [AuthGuard]},
  {path: 'rewards', component: Rewards, canActivate: [AuthGuard]},
  {path: 'settings', component: Settings, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
