import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';
import { RouterLinkService } from 'src/app/services/router-link.service';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { FilterComponent } from '../filter/filter.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts-feed',
  templateUrl: './posts-feed.component.html',
  styleUrls: ['./posts-feed.component.scss'],
})
export class PostsFeedComponent implements OnInit {
  constructor(
    private postService: PostService,
    public dialog: MatDialog,
    private routerLinkService: RouterLinkService,
    private _bottomSheet: MatBottomSheet
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

  showFilterPopUp() {
    const dialogRef = this.dialog.open(FilterComponent);
    dialogRef.afterClosed().subscribe((filter) => {
      if (filter) {
        this.postService.filter(filter).subscribe(
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
      data: { decription: post.description },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.postService.editPost(res);
    });
  }

  addLike(postId: number, index: number) {
    if (!this.isPostLiked[index]) this.postLikeCounter[index]++;
    else this.postLikeCounter[index]--;
    this.isPostLiked[index] = !this.isPostLiked[index];
    this.postService.addLike(postId).subscribe((res) => {
      console.log('liked added');
    });
  }

  postChosen(post: Post) {
    console.log(post.id);

    const bottomSheetRef = this._bottomSheet.open(PostComponent, {
      data: { id: post.id },
    });
    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }
}
