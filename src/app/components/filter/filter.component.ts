import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Filter from 'src/app/Model/Filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  startingDate!: Date | null;
  endingDate!: Date | null;
  publishers!: any | null;
  tags!: any | null;
  userTagged!: any | null;
  filter!: Filter;

  constructor(private ref: MatDialogRef<FilterComponent>) {}

  ngOnInit(): void {
    this.clearInputs();
  }

  clearInputs() {
    this.startingDate = null;
    this.endingDate = null;
    this.publishers = null;
    this.tags = null;
    this.userTagged = null;
  }
  sendFilter() {
    this.publishers == null
      ? (this.publishers = null)
      : (this.publishers = this.publishers.toString().split(','));
    this.tags == null
      ? (this.tags = null)
      : (this.tags = this.tags.toString().split(','));
    this.userTagged == null
      ? (this.userTagged = null)
      : (this.userTagged = this.userTagged.toString().split(','));
    // this.postService.filter({publishers:this.publishers,startingDate:this.startingDate,endingDate:this.endingDate,
    //   tags:this.tags,taggedUsers:this.userTagged
    // });
    // this.clearInputs()
    this.ref.close({
      publishers: this.publishers,
      startingDate: this.startingDate,
      endingDate: this.endingDate,
      tags: this.tags,
      taggedUsers: this.userTagged,
    });
  }
}
