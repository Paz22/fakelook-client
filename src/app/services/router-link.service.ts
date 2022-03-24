import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from '../Model/User';

@Injectable({
  providedIn: 'root',
})
export class RouterLinkService {
  routerChanged: BehaviorSubject<any>;
  postChange: BehaviorSubject<any>;

  constructor() {
    this.routerChanged = new BehaviorSubject(false);
    this.postChange = new BehaviorSubject(false);
  }

  atHome(link: boolean) {
    this.routerChanged.next(link);
  }

  postChanged(answer: boolean) {
    this.postChange.next(answer);
  }
}
