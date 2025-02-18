import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../users/login/LoginRequest';
import { RegisterRequest } from '../users/registration/RegisterRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8080/api/auth/';
  private http = inject(HttpClient);
  constructor() { }

  login(loginRequest:LoginRequest):Observable<any> {
    return this.http.post<any>(this.baseUrl+'login', loginRequest);
  }

  register(registerPayload:RegisterRequest):Observable<any> {
    return this.http.post<any>(this.baseUrl+'register', registerPayload);
  }

  saveUserInLocalStorage(jwtResponse:any) : void {
    localStorage.setItem("token", jwtResponse.token);
  }

  getBearerToken() {
    return localStorage.getItem('token');
  }

  clearUserFromLocalStorage() : void {
    localStorage.clear();
  }

  isLoggedIn() : boolean {
    return localStorage.getItem("token") !== null;
  }
}
