import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post('https://dummyjson.com/auth/signup', user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post('https://dummyjson.com/auth/login', credentials);
  }
}
