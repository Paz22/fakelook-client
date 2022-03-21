import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';
import { RouterLinkService } from 'src/app/services/router-link.service';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-posts-feed',
  templateUrl: './posts-feed.component.html',
  styleUrls: ['./posts-feed.component.scss'],
})
export class PostsFeedComponent implements OnInit {
  constructor(
    private postService: PostService,
    public dialog: MatDialog,
    private routerLinkService: RouterLinkService
  ) {
    if (!this.isPostLiked) this.isPostLiked = [];
    this.postLikeCounter = [];
  }
  posts!: any[];
  currPost: any;
  currUserName!: string | null;
  isPostLiked!: boolean[];
  postLikeCounter: number[];

  ngOnInit(): void {
    this.initList();
    this.currUserName = localStorage.getItem('userName');
    this.listenToNewPost();
  }
  listenToNewPost() {
    this.routerLinkService.postChange.subscribe((event) => {
      if (event) this.initList();
    });
  }
  initList() {
    this.postService.getAllPosts().subscribe(
      (result) => {
        this.posts = result;
        console.log(this.posts);
        this.posts.forEach((post) => {});
        this.initLikedPosts();
        this.initLikedPostNumber();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletePost() {}

  initLikedPosts() {
    var currId = localStorage.getItem('id');
    for (var i = 0; i < this.posts.length; i++) {
      for (var j = 0; j < this.posts[i].likes.length; j++) {
        if (
          this.posts[i].likes[j].user.id == currId &&
          this.posts[i].likes[j].isActive
        ) {
          this.isPostLiked[i] = true;
        } else {
          this.isPostLiked[i] = false;
        }
      }
    }
    console.log(this.isPostLiked);
  }

  initLikedPostNumber() {
    for (var i = 0; i < this.posts.length; i++) {
      var postsLiked = 0;
      for (var j = 0; j < this.posts[i].likes.length; j++) {
        if (this.posts[i].likes[j].isActive) {
          postsLiked++;
        }
      }
      this.postLikeCounter[i] = postsLiked;
    }
  }

  editPost(post: Post) {
    var dialogRef = this.dialog.open(EditPostComponent, {
      width: '150px',
      data: { decription: post.Description },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.postService.editPost(res);
    });
  }

  addLike(postId: number) {
    this.postService.addLike(postId).subscribe((res) => {
      console.log('liked added');
    });
  }

  postChosen(post: Post) {
    console.log(post);
  }
}
