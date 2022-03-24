import { D } from '@angular/cdk/keycodes';
import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import Post from 'src/app/Model/Post';
import User from 'src/app/Model/User';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  Editable: boolean = false;
  EditMode: boolean = false;
  constructor(
    private postService: PostService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { id: number }
  ) {
    this.post = {} as Post;
    this.writer = {} as User;
    this.loading = false;
  }

  post: Post;
  writer: User;
  commentVal = '';
  loading: boolean;
  ngOnInit(): void {
    console.log(this.data);
    this.loading = true;
    this.initPost();
  }
  initPost() {
    var userID = parseInt(localStorage.getItem('id')!);

    this.postService.getPostById(this.data.id).subscribe((result) => {
      console.log(result);
      this.post = result;
      if (this.post.userId == userID) {
        this.Editable = true;
      }
      this.userService
        .getUserBySpecificId(this.post.userId)
        .subscribe((user) => {
          this.writer = user;
          this.loading = false;
        });
    });
  }

  addComment() {
    this.loading = true;
    this.postService.addComment(this.post.id, this.commentVal).subscribe(
      (result) => {
        this.initPost();
        this.loading = false;
        console.log(result);
        this._snackBar.open(
          this.writer.userName + ' Will Be Happy For Your Comment :)',
          'Dismiss',
          {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            verticalPosition: 'top',
          }
        );
      },
      (error) => {
        this.initPost();
        this.loading = false;
        this._snackBar.open(error, 'Dismiss', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          verticalPosition: 'top',
        });
        console.log(error);
      }
    );
  }

  editPost(id: number) {
    const bottomSheetRef = this._bottomSheet.open(EditPostComponent, {
      data: { id: id },
    });
    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }
}
