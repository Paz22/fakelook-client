import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AcNotification,
  ActionType,
  ViewerConfiguration,
} from 'angular-cesium';
import { map, mergeMap, Observable, tap } from 'rxjs';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  Cesium = Cesium;
  entities$!: Observable<any>;
  selectedPost!: Post;
  showDialog = false;
  constructor(
    private postService: PostService,
    private viewerConf: ViewerConfiguration,
    private router: Router
  ) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: false,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      useDefaultRenderLoop: true,
    };
  }

  initPostsOnMap() {
    this.entities$ = this.postService.getAllPosts().pipe(
      map((posts) => {
        return posts.map((post: Post) => ({
          id: post.id,
          actionType: ActionType.ADD_UPDATE,
          entity: {
            ...post,
            location: {
              x: post.x_Position,
              y: post.y_Position,
              z: post.z_Position,
            },
          },
        }));
      }),
      tap((posts) => console.log(posts)),
      mergeMap((entity) => entity)
    );
  }
  ngOnInit(): void {
    this.softGuard();
    this.initList();
  }
  initList() {
    this.initPostsOnMap();
  }
  showFullPost(post: Post): void {
    this.showDialog = true;
    this.selectedPost = post;
  }
  closeDialog(): void {
    this.showDialog = false;
  }
  softGuard() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }
}
