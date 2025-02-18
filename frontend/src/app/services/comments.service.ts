import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../dashboard/all-comments/Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private baseUrl = 'http://localhost:8080/api/v1/comments';

  private refreshSubject = new BehaviorSubject<void>(undefined);

  refresh$ = this.refreshSubject.asObservable();

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const authToken = localStorage.getItem('token');
    headers = headers.set('Authorization', 'Bearer ' + authToken);
    return headers;
  }

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this.refreshSubject.next();
  }

  addComment(blogId: number, comment: string): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.baseUrl}/${blogId}`,
      { comment },
      { headers: this.getHeaders() }
    );
  }

  getComments(blogId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/${blogId}`, {
      headers: this.getHeaders(),
    });
  }

  deleteComment(blogId: number, commentId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${blogId}/${commentId}`, {
      headers: this.getHeaders(),
    });
  }
}
