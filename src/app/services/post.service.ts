import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../Model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getAllPosts() :Observable<string>
  {
    return this.http.get<string>("https://localhost:44349/api/PostsAPI/GetAll");
  }

  newPost(post:Post) :Observable<Post> {
    return this.http.post<Post>(`${environment.postsUrl}/api/PostsAPI`, post)
  }

 
}
