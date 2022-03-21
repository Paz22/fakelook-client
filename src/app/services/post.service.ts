import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Filter from '../Model/Filter';
import Post from '../Model/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    console.log('jere');
    const currentUrl = 'https://localhost:44349/api/PostsAPI/GetAll';
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

  addLike(postId:number)
  {
    var userID=localStorage.getItem('id');
    return this.http.post<any>(`${environment.likesURL}`,{postId:postId,userID:userID});
  }

 

  filter(filter:Filter)
  {
    return this.http.post<any>(`${environment.postsUrl}/api/PostsAPI/Filter`,filter).subscribe((res)=>
    {
      res.forEach((element: any) =>
      {
        console.log(element);
      });
    });
  }
  

  newPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.postsUrl}/api/PostsAPI`, post);
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.postsUrl}/api/PostsAPI`, post);
  }
  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
