import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  set me(user: any) {
    localStorage.setItem('user', new User(user['id'], user['uid'], user['username'],
    user['email'], user['profile'], user['icon_image'], user['provider']));
  }
}
