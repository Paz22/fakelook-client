import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Post from 'src/app/Model/Post';
import User from 'src/app/Model/User';
import { PostService } from 'src/app/services/post.service';
import { RouterLinkService } from 'src/app/services/router-link.service';
import { UserService } from 'src/app/services/user.service';
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
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private userService: UserService
  ) {
    if (!this.isPostLiked) this.isPostLiked = [];
    this.postLikeCounter = [];
    this.loading = false;
  }
  posts!: any[];
  initPosts!: any[];
  currPost: any;
  currUserName!: string | null;
  isPostLiked: boolean[] = [];
  postLikeCounter: number[] = [];
  images: string[] = [];
  names: string[] = [];
  allUsers!: User[];

  img: string = '../../../assets/Images/user-login-avatar.png';
  loading: boolean;

  ngOnInit(): void {
    this.softGuard();
    //   this.initList();
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
            this.initProfileImages();
            console.log(this.posts);
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
  initImages(allUsers: User[]) {
    this.allUsers = allUsers;
    this.initList();
  }

  initLikeForPost() {
    this.posts.forEach((post) => {});
  }

  initList() {
    this.loading = true;
    this.postService.getAllPosts().subscribe(
      (result) => {
        this.posts = result;
        this.initPosts = result;
        // this.posts.reverse();
        console.log(this.posts);
        this.loading = false;
        this.initLikedPosts();
        this.initLikedPostNumber();
        this.initProfileImages();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  initProfileImages() {
    for (var i = 0; i < this.posts.length; i++) {
      var pic = this.allUsers.find(
        (u) => parseInt(u.id) === this.posts[i].userId
      )?.profilePic;

      var userName = this.allUsers.find(
        (u) => parseInt(u.id) === this.posts[i].userId
      )?.userName;

      if (pic != null) {
        this.images[i] = pic;
      } else {
        this.images[i] = this.img;
      }
      if (userName != null) {
        this.names[i] = userName;
      }
    }
    console.log('here');
    console.log(this.names);
  }

  deletePost() {}

  initLikedPosts() {
    var currId = localStorage.getItem('id');
    if (this.posts)
      for (var i = 0; i < this.posts.length; i++) {
        if (this.posts[i].likes)
          for (var j = 0; j < this.posts[i].likes.length; j++) {
            if (
              this.posts[i].likes[j].userId == currId &&
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
    if (this.posts)
      for (var i = 0; i < this.posts.length; i++) {
        var postsLiked = 0;
        if (this.posts[i].likes)
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

  postChosen(id: number) {
    this.posts = this.initPosts;
    console.log(id);
    const bottomSheetRef = this._bottomSheet.open(PostComponent, {
      data: { id: id },
    });
    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }

  softGuard() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }
}
