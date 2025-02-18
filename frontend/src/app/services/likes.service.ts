import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogPost } from '../dashboard/all-blogs/BlogPost';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private baseUrl = 'http://localhost:8080/api/v1'; 

  private refreshSubject = new BehaviorSubject<void>(undefined);

  refresh$ = this.refreshSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this.refreshSubject.next();
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const authToken = localStorage.getItem('token');
    headers = headers.set('Authorization', 'Bearer ' + authToken);
    return headers;
  }

  toggleLike(blogId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/likes/${blogId}`, {}, {headers: this.getHeaders()});
  }

  getLikeCount(blogId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/likes/${blogId}/count`, {headers: this.getHeaders()});
  }

  getMyLikedBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.baseUrl}/myLikes`, {headers: this.getHeaders()});
  }
}
