import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  post!: Post;
  tags!:string[];
  userTagged!:string[];
  currXPos:number=0;
  currYPos:number=0;
  currZPos:number|null=0;

 

  constructor(private postService: PostService, private router: Router,private datePipe:DatePipe) {}

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

  parsePostDescription(postDescription:string)
  {
    var splittedByTags=postDescription.split("#");
    splittedByTags.forEach(element => {
      this.tags.push(element.split(" ")[0]);      
    });

    var splittedByTagged=postDescription.split("@");
    splittedByTagged.forEach(element => {
      this.tags.push(element.split(" ")[0]);      
    });
  }

  getCurrLocation()
  {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        this.currXPos=data.coords.longitude;
        this.currYPos=data.coords.latitude;
        this.currZPos=data.coords.altitude; 
      })  
  }

  addNewpost()
  {
    this.getCurrLocation();
    this.post.x_Position=this.currXPos;
    this.post.y_Position=this.currYPos;
    this.post.z_Position=this.currZPos; 
    this.parsePostDescription(this.post.Description);
    this.post.tags=this.tags;
    this.post.tagged=this.userTagged;
    var currDate=new Date();
    this.datePipe.transform(currDate,"yyyy-mm-dd");
    this.post.Date=currDate;
    this.post.UserId=parseInt(localStorage.getItem('id')||'');
    this.post.IsEdited=false;
    this.post.PermissionLevel=1;
    this.postService.newPost(this.post).subscribe((res) => {
      console.log(res);
    });
  }
    

  









  

  

 
}
