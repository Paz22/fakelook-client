import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../Model/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    const currentUrl = 'https://localhost:44349/api/PostsAPI/GetAll';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
    });
    return this.http.get<any>(currentUrl, { headers });
  }

  newPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.postsUrl}/api/PostsAPI`, post);
  }
  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
