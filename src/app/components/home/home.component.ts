import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLinkService } from 'src/app/services/router-link.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private routerLinkService: RouterLinkService) {}
  ngOnDestroy(): void {
    this.routerLinkService.atHome(false);
  }

  ngOnInit(): void {
    this.routerLinkService.atHome(true);
  }
}
