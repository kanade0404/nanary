import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { GlobalService } from '../services/global.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private globalService: GlobalService, private userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }
  /**
   * ユーザーが登録済みならトークンを取得しログイン
   * ユーザーが未登録なら登録後、トークンを取得しログイン
   * @param provider 
   */
  async login(provider: string) {
    if(provider === 'google') {
      let credential = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log(credential);
      this.userService.findUserByEmail(credential.user.email).subscribe(
        user => {
          if(user.length === 0) {
            let param = {
              'username': credential.user.displayName,
              'email': credential.user.email,
              'password': credential.user.uid,
              'icon_image': credential.user.photoURL,
              'provider': provider
            }
            this.signupGoogle(param);
            this.router.navigate(['/']);
          }else if(user.length === 1) {
            let param = {
              'username': credential.user.displayName,
              'email': credential.user.email,
              'password': credential.user.uid
            }
            this.signinGoogle(param);
            this.router.navigate(['/']);
          }
        }
      )
    }
  }
  /**
   * ログイン処理
   * @param userData 
   */
  signinGoogle(userData: any): void {
    this.userService.loginUser(userData).subscribe(
      loginUser => {
        this.globalService.me = loginUser;
        localStorage.setItem('token', loginUser['token']);
      },
      error => {
        console.error(error);
      }
    )
  }
  signupGoogle(userData: any): void {
    this.userService.registerUser(userData).subscribe(
      registerUser => {
        this.userService.loginUser(registerUser).subscribe(
          loginUser => {
            this.globalService.me = loginUser;
            localStorage.setItem('token', loginUser['token']);
          },
          error => {
            console.error(error);
          }
        )
      }
    )
  }
  logout(): void {
    firebase.auth().signOut()
    .then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      console.error(error);
    })
  }
}
