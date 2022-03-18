import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterLinkService {
  routerChanged: BehaviorSubject<any>;

  constructor() {
    this.routerChanged = new BehaviorSubject(false);
  }

  atHome(link: boolean) {
    this.routerChanged.next(link);
  }
}
