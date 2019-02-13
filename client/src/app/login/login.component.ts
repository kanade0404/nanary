import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private socialAuthService: AuthService, private router: Router,
    private globalService: GlobalService) { }

  ngOnInit() {
    if(localStorage.getItem('uuid') && localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  clickedGoogleLogin(socialPlatform: string) {
    let socialPlatformProvider;
    if(socialPlatform === "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID
    }
    this.socialAuthService.signIn(socialPlatformProvider)
    .then((userData) => {
      localStorage.setItem('uuid', userData.id);
      this.globalService.me = userData;
      this.router.navigate(['/']);
    })
    .catch((error) => {
      console.log(error);
    })
  }

}
