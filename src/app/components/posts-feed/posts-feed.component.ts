import { Component, OnInit } from '@angular/core';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-feed',
  templateUrl: './posts-feed.component.html',
  styleUrls: ['./posts-feed.component.scss'],
})
export class PostsFeedComponent implements OnInit {
  constructor(private postService: PostService) {}
  posts!: any[];
  ngOnInit(): void {
    this.initList();
  }
  initList() {
    this.postService.getAllPosts().subscribe(
      (result) => {
        this.posts = result;
        console.log(this.posts);
        this.posts.forEach((element) => {});
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
