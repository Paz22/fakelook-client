import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  post!: Post;
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log('Error' + error.status);
        this.router.navigate(['/']);
      }
    );
  }

  addNewPost() {
    this.postService.newPost(this.post).subscribe((res) => {
      console.log(res);
    });
  }
}
