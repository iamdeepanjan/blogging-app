import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogPost } from '../dashboard/all-blogs/BlogPost';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private baseUrl = 'http://localhost:8080/api/v1';

  private http = inject(HttpClient);
  private refreshSubject = new BehaviorSubject<void>(undefined);

  refresh$ = this.refreshSubject.asObservable();
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const authToken = localStorage.getItem('token');
    headers = headers.set('Authorization', 'Bearer ' + authToken);
    return headers;
  }
  // Method to trigger a refresh event
  triggerRefresh() {
    this.refreshSubject.next();
  }

  getAllBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.baseUrl}/blogs`, {headers: this.getHeaders()});
  }

  createBlog(blog: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.baseUrl}/myblogs`, blog, {headers: this.getHeaders()});
  }

  getMyBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.baseUrl}/myblogs`, {headers: this.getHeaders()});
  }

  getBlogById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.baseUrl}/blogs/${id}`, {headers: this.getHeaders()});
  }

  updateBlog(id: number, blog: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.baseUrl}/blogs/${id}`, blog, {headers: this.getHeaders()});
  }

  deleteBlog(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/blogs/${id}`, {headers: this.getHeaders()});
  }
}
