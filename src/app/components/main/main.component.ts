import { Component, OnInit } from '@angular/core';
import {
  AcNotification,
  ActionType,
  ViewerConfiguration,
} from 'angular-cesium';
import { map, mergeMap, Observable, tap } from 'rxjs';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ViewerConfiguration],
})
export class MainComponent implements OnInit {
  constructor(
    private postService: PostService,
    private viewerConf: ViewerConfiguration
  ) {}

  ngOnInit(): void {}
}
