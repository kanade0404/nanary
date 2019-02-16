import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
import { AppRoutingModule } from './app-routing.module';
/**
 * ng-bootstrap
 */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Angular Material Module
 */
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/**
 * Custom Component
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { GlobalService } from './services/global.service';

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
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    NgbModule.forRoot()
  ],
  providers: [
    { provide: AuthServiceConfig, useFactory: getAuthServideConfigs},
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
