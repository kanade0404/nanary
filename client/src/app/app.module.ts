import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
// routing
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
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';


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
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    GlobalService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
