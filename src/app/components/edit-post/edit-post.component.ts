import { Input,Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  tags!:string[];
  userTagged!:string[];
  postInput!:string;
  constructor(private postService:PostService) { }



  ngOnInit(): void
  {}

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

  saveChanges()
  {
    this.parsePostDescription(this.postInput);
  }


    

 

}
