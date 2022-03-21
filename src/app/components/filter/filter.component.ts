import { Component, OnInit } from '@angular/core';
import Filter from 'src/app/Model/Filter';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  startingDate!:Date|null;
  endingDate!:Date|null;
  publishers!:any|null;
  tags!:any|null;
  userTagged!:any|null;
  filter!:Filter;

  constructor(private postService:PostService) { }

  ngOnInit(): void
  {
    this.startingDate=null;
    this.endingDate=null;
    this.publishers=null;
    this.tags=null;
    this.userTagged=null;
  }


  sendFilter()
  {
    this.publishers==null? this.publishers=null:this.publishers=this.publishers.split(",");
    this.tags==null? this.tags=null:this.tags=this.tags.split(",");
    this.userTagged==null? this.userTagged=null:this.userTagged=this.userTagged.split(",");
    this.postService.filter({publishers:this.publishers,startingDate:this.startingDate,endingDate:this.endingDate,
      tags:this.tags,taggedUsers:this.userTagged
    });
  }



}
