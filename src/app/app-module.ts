import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Menu } from './menu/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomePage } from './welcome-page/welcome-page';
import { LoginPage } from './login-page/login-page';
import { SignupPage } from './signup-page/signup-page';
import { DashboardPage } from './dashboard-page/dashboard-page';
import { MissionsPage } from './missions-page/missions-page';
import { RewardsPage } from './rewards-page/rewards-page';
import { SettingsPage } from './settings-page/settings-page';

@NgModule({
  declarations: [
    App,
    Menu,
    WelcomePage,
    LoginPage,
    SignupPage,
    DashboardPage,
    MissionsPage,
    RewardsPage,
    SettingsPage,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
