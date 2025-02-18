import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../dashboard/user-profile/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/logged-user'; // Base URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const authToken = localStorage.getItem('token');
    headers = headers.set('Authorization', 'Bearer ' + authToken);
    return headers;
  }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl, { headers: this.getHeaders() });
  }

  changePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/change-password`, passwordData, { headers: this.getHeaders() });
  }
}
