import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  AcNotification,
  ActionType,
  ViewerConfiguration,
} from 'angular-cesium';
import { map, mergeMap, Observable, of, pairwise, tap } from 'rxjs';
import Filter from 'src/app/Model/Filter';
import Post from 'src/app/Model/Post';
import { PostService } from 'src/app/services/post.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  Cesium = Cesium;
  entities$: Observable<AcNotification> | undefined;
  selectedPost!: Post;
  prevPosts!:Post[];

  showDialog = false;
  constructor(
    private postService: PostService,
    private viewerConf: ViewerConfiguration,
    private router: Router,
    public dialog: MatDialog,

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
    this.entities$ = this.postService.getAllPostMap().pipe(
      pairwise(),
      map((posts) => {
        const combine = posts[0].concat(posts[1])
        const p =  combine.map((post: Post) => ({
          id: post.id.toString(),
          actionType: this.getActionType(post,posts[1]),
          entity: {
            ...post,
            location: Cesium.Cartesian3.fromDegrees(
              post.x_Position,
              post.y_Position,
              post.z_Position
            ),
            isShow: true,
          },
        }));
        return p;
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
  filter(filter:Filter){
    this.postService.filterMap(filter);
  }
  getActionType(post:Post,newPosts:Post[]):ActionType{
    let action;
    newPosts.find(p =>p.id === post.id)?action =  ActionType.ADD_UPDATE : action = ActionType.DELETE;
    return action;
  }

  showFilterPopUp()
  {
    const dialogRef = this.dialog.open(FilterComponent);
    dialogRef.afterClosed().subscribe((filter) => {
      this.filter(filter)
    });
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
