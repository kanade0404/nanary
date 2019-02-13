import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SocialUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private userSource = new BehaviorSubject<SocialUser>(new SocialUser());
  user = this.userSource.asObservable();
  set me(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSource.next(user);
  }
}
