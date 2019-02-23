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
  loginUser(userData: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'api-auth-token/', userData, {headers: this.httpHeaders});
  }
  registerUser(userData: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/', userData, {headers: this.httpHeaders});
  }
  findUserByEmail(email: string): Observable<any> {
    return this.http.get(environment.baseUrl + 'auth/?email=' + email, {headers: this.httpHeaders});
  }
}
