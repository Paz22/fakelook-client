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

  getAllPosts(): Observable<Post[]> {
    console.log('jere');
    const currentUrl = `${environment.postsUrl}/GetAllPosts`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
    });
    return this.http.get<Post[]>(currentUrl, { headers });
  }

  //deletePost(post:Post):Observable<Post>
  //{
  //  const headers=new HttpHeaders({
  //    Authorization:'Bearer'+this.getToken(),});
  //    return this.http.delete<Post>(`${environment.postsUrl}/api/PostsAPI`,{headers},post.id);
  //}

  newPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.postsUrl}/AddPost`, post);
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.postsUrl}/EditPost`, post);
  }
  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  addLike(postId: number) {
    var userID = localStorage.getItem('id');
    return this.http.post<any>(`${environment.likesURL}`, {
      postId: postId,
      userID: userID,
    });
  }

  addComment(postId: number, value: string) {
    var userID = localStorage.getItem('id');

    return this.http.post<any>(`${environment.commentsURL}`, {
      userId: userID,
      content: value,
      postId: postId,
    });
  }

  getPostById(postId: number) {
    return this.http.get<Post>(
      `${environment.postsUrl}/GetPostById?id=${postId}`
    );
    // return this.http.get<Post>(
    //   'https://localhost:44349/api/PostsAPI/GetPostById?id=' + postId
    // );
  }
}
