import { D } from '@angular/cdk/keycodes';
import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  Editable: boolean = false;

  constructor(
    private postService: PostService,
    private _bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { id: number }
  ) {
    this.post = {} as Post;
  }

  post: Post;
  commentVal = '';
  ngOnInit(): void {
    var userID = parseInt(localStorage.getItem('id')!);
    console.log(this.data);
    this.postService.getPostById(this.data.id).subscribe((result) => {
      console.log(result);
      this.post = result;
      if (this.post.userId == userID) {
        this.Editable = true;
      }
    });
  }

  addComment() {
    this.postService.addComment(this.post.id, this.commentVal).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
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
