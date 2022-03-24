import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';
import { DatePipe } from '@angular/common';
import Tag from 'src/app/Model/Tag';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/Model/User';
import { ThisReceiver } from '@angular/compiler';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  post!: Post;
  userTagged!: string[];
  currXPos: number = 0;
  currYPos: number = 0;
  currZPos: number | null = 0;
  imgFile?: File;
  inputValue: string = 'sad';
  writingTag: boolean;
  imgSrc = '../../../assets/Images/camera-removebg-preview.png';
  separatorKeysCodes: number[] = [];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [''];
  tagsForServer: any[] = [];
  userTags: string[] = [];
  userTagsForServer: any[] = [];
  writingUserTag: boolean;
  userTaggedPost: any[] = [];
  userList: any[] = [];
  allTags: string[] = [];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  loading: boolean;

  constructor(
    private postService: PostService,
    private router: Router,
    private datePipe: DatePipe,
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.loading = false;
    this.writingTag = false;
    this.writingUserTag = false;
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allTags.slice()
      )
    );
    this.initFriendList();
  }
  initFriendList() {
    this.userService.getAll().subscribe((result) => {
      this.userList = result;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }

  removeUserTag(userTag: string) {
    const index = this.userTags.indexOf(userTag);
    const indexList = this.userTaggedPost.indexOf(userTag);
    const indexForServer = this.userTagsForServer.indexOf(userTag);
    if (index >= 0) {
      this.userTags.splice(index, 1);
      this.userTaggedPost.splice(indexList, 1);
      this.userTagsForServer.splice(indexForServer, 1);
    }
  }

  inputChanged(event: any) {
    if (event.key == '#') {
      this.writingTag = true;
      console.log(this.writingTag);
      this.separatorKeysCodes = [ENTER, COMMA, SPACE];
    }
    if (event.key == '@') {
      this.writingUserTag = true;
      this.separatorKeysCodes = [ENTER, COMMA, SPACE];
    }
  }

  ngOnInit(): void {
    this.post = {} as Post;
    this.post.userId = 1;
    this.initFirstTag();
    let tag = {} as Tag;
    tag.content = 'sdklm';
    this.tags = [];
    this.post.description = '';
  }
  initFirstTag() {
    const userName = localStorage.getItem('name');
    const userId = localStorage.getItem('id');
    if (userName && userId) {
      this.userTaggedPost.push({ userId: userId });
      this.userTags.push(userName);
      console.log(this.userTags);
    }
  }

  parsePostDescription(postDescription: string) {
    var splittedByTags = postDescription.split('#');
    splittedByTags.forEach((element) => {
      let tag = {} as Tag;
      tag.content = element.split(' ')[0];
      //     this.tags.push(tag);
    });

    var splittedByTagged = postDescription.split('@');
    splittedByTagged.forEach((element) => {
      let tag = {} as Tag;
      tag.content = element.split(' ')[0];
      //     this.tags.push(tag);
    });
  }

  getCurrLocation() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.currXPos = data.coords.longitude;
      this.currYPos = data.coords.latitude;
      this.currZPos = data.coords.altitude;
      this.post.x_Position = this.currXPos;
      this.post.y_Position = this.currYPos;
      this.post.z_Position = 32.0852999;
      console.log(this.post.description);
      console.log(this.post.y_Position);
      console.log(data.coords.altitude);
      this.post.description = this.tagInput.nativeElement.value;

      if (this.post.description.length > 1) {
        this.parsePostDescription(this.post.description);
        this.post.tags = this.tagsForServer;
        this.post.tagged = this.userTagged;
        var currDate = new Date();
        this.datePipe.transform(currDate, 'yyyy-mm-dd');
        this.post.date = currDate;
        this.post.userId = parseInt(localStorage.getItem('id') || '0');

        this.post.IsEdited = false;
        this.post.PermissionLevel = 1;
        this.post.imageSorce = this.imgSrc;
        console.log(this.post);

        this.postService.newPost(this.post).subscribe(
          (res) => {
            console.log(res);
            this.loading = false;
            this.showPopupMessage('New Post Added');
            this.dialogRef.closeAll();
          },
          (error) => {
            this.loading = false;
            this.showPopupMessage('Error Has accured');
            console.log(error);
          }
        );
      } else {
        console.log('Put Some Description');
        this.showPopupMessage('Put Some Description');
      }
    });
  }

  addNewpost() {
    console.log(this.inputValue + 'value');
    this.post.tags = this.tags;
    this.post.userTaggedPost = this.userTaggedPost;
    this.getCurrLocation();
  }

  showFilePreview(event: any) {
    console.log('here');
    this.imgFile = event.target.files[0];
    if (this.imgFile) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
        console.log(this.imgSrc);
      };
      reader.readAsDataURL(this.imgFile);
    }
  }

  showPopupMessage(result: string) {
    this._snackBar.open(result, 'Dismiss', {
      duration: 3000,
      panelClass: ['blue-snackbar'],
      verticalPosition: 'top',
    });
  }

  add(event: any): void {
    if (this.writingTag) {
      console.log(event);
      let value = (event.value || '').trim();
      if (value) {
        var words = value.split(' ');
        console.log(typeof value);
        this.tags.push(words[words.length - 1]);
        this.tagsForServer.push({ content: words[words.length - 1] });
        words.pop();
      }
      this.tagInput.nativeElement.value = words.join(' ');
      this.post.description = this.tagInput.nativeElement.value;
      console.log(this.tags);
      this.tagCtrl.setValue(null);
      this.separatorKeysCodes = [];
    }
    if (this.writingUserTag) {
      let value = (event.value || '').trim();
      if (value) {
        var words = value.split(' ');
        var userTag = words[words.length - 1];
        userTag = userTag.substring(1);

        console.log(userTag);
      }
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    const indexForServer = this.tagsForServer.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagsForServer.splice(indexForServer, 1);
    }
  }

  userTagChosen(event: any) {
    console.log('user Tag Chosen');
    this.writingUserTag = false;
    this.separatorKeysCodes = [];
    var value = this.tagInput.nativeElement.value;
    var res = value.split(' '); //split by space
    res.pop(); //remove last element
    this.tagInput.nativeElement.value = res.join(' '); //join back together
    this.userTaggedPost.push({ userId: event.id });
    this.userTags.push(event.userName);
  }

  selected(event: any): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
}
