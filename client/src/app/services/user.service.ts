import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  constructor(private http: HttpClient) { }
  // ユーザー登録
  registerUser(userData: any): Observable<any> {
    return this.http.post(environment.baseApiUrl + 'user/', userData, { headers: this.httpHeaders });
  }
}
