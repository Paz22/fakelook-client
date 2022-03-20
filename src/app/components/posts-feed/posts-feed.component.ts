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
        this.posts.forEach((element) => {});
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletePost() {}

  editPost(post: Post) {
    var dialogRef = this.dialog.open(EditPostComponent, {
      width: '150px',
      data: { decription: post.Description },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.postService.editPost(res);
    });
  }

  postChosen(post: Post) {}
}
