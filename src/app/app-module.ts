import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Menu } from './menu/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Welcome } from './welcome/welcome';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { Missions } from './missions/missions';
import { Rewards } from './rewards/rewards';
import { Settings } from './settings/settings';

@NgModule({
  declarations: [
    App,
    Menu,
    Welcome,
    Login,
    Signup,
    Dashboard,
    Missions,
    Rewards,
    Settings,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
