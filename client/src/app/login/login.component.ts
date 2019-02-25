import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { GlobalService } from '../services/global.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auAuth: AngularFireAuth, private router: Router, private globalService: GlobalService, private userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('token')) {
      this.router.navigate(['home']);
    }
  }
  /**
   * ユーザーが登録済みならトークンを取得しログイン
   * ユーザーが未登録なら登録後、トークンを取得しログイン
   * @param provider 
   */
  async login(provider: string) {
    if(provider === 'google') {
      // const authProvider = new auth.GoogleAuthProvider();
      // let credential = await this.auAuth.auth.signInWithPopup(authProvider);
      let x = await this.auAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(
        credential => {
          this.userService.findUserByEmail(credential.user.email).subscribe(
            user => {
              if(user.length === 0) {
                let param = {
                  'username': credential.user.displayName,
                  'email': credential.user.email,
                  'password': credential.user.uid,
                  'icon_image': credential.user.photoURL,
                  'provider_name': provider
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
      })
      .catch(
        error => {
        console.error(error);
      });
      console.log(x);
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
    this.auAuth.auth.signOut()
    .then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      console.error(error);
    })
  }
}
