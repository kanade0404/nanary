import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { environment } from '../environments/environment';

export function getAuthServideConfigs() {
  let config = new AuthServiceConfig(
    [
      {id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider(environment.googleClientId)}
    ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    MatIconModule
  ],
  providers: [{ provide: AuthServiceConfig, useFactory: getAuthServideConfigs}],
  bootstrap: [AppComponent]
})
export class AppModule { }
