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
  ) {}
  posts!: any[];
  currPost: any;
  currUserName!: string | null;
  isPostLiked!: boolean[];

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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletePost() {}

  initLikedPosts() {
    if (!this.isPostLiked) this.isPostLiked = [];
    var currId = localStorage.getItem('id');
    for (var i = 0; i < this.posts.length; i++) {
      for (var j = 0; j < this.posts[i].likes.length; j++) {
        if (this.posts[i].likes[j].UserId == currId) {
          this.isPostLiked[i] = true;
        }
      }
    }
    console.log(this.isPostLiked);
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
      for (var j = 0; j < this.posts.length; j++) {
        if ((this.posts[j].id = postId)) {
          this.posts[j] = res.isActive;
        }
      }
    });
  }

  postChosen(post: Post) {
    console.log(post);
  }
}
