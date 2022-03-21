import { Component, OnInit,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-posts-feed',
  templateUrl: './posts-feed.component.html',
  styleUrls: ['./posts-feed.component.scss'],
})
export class PostsFeedComponent implements OnInit {
  constructor(private postService: PostService,public dialog:MatDialog) {}
  posts!: any[];
  currUserName!:string|null;
  isPostLiked!:boolean[];

  ngOnInit(): void {
    this.initList();
    this.currUserName=localStorage.getItem('userName');
    this.initLikedPosts();
    
  }

  initLikedPosts()
  {
    var currId=localStorage.getItem('id');
    for(var i=0;i<this.posts.length;i++)
    {
      for(var j=0;j<this.posts[i].likes.length;j++)
      {
        if(this.posts[i].likes[j].UserId == currId)
        {
          this.isPostLiked[i]=true;
        }
      }
    }
  }

  initList()
  {
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
  
  

  addLike(postId:number)
  {
    this.postService.addLike(postId).subscribe((res)=>
    {
      for(var j=0;j<this.posts.length;j++)
      {
        if(this.posts[j].id=postId)
        {
          this.posts[j]=res.isActive;
        }
      }
    })
  
  }


  showFilterPopUp()
  {
    const dialogRef = this.dialog.open(FilterComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      
    });
  }

  deletePost()
  {

  }


  

  editPost(post:any)
  {
 
    var dialogRef=this.dialog.open(EditPostComponent,
      {
        width:'150px',
        data:{decription:post.Description}
      });
    dialogRef.afterClosed().subscribe((res)=>
    {
      this.postService.editPost(res);
    })
    
    

  }
  
}
