import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLinkService } from '../services/router-link.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @ViewChild('logoContainer') logoContainer!: any;

  constructor(private routerLinkService: RouterLinkService) {}

  ngOnInit(): void {
    this.animationHandler();
  }
  animationHandler() {
    this.routerLinkService.routerChanged.subscribe((event) => {
      if (event) {
        this.logoContainer.nativeElement.classList.remove('logo-not-at-home');
        this.logoContainer.nativeElement.classList.add('logo-at-home');
      } else {
        this.logoContainer.nativeElement.classList.remove('logo-at-home');
        this.logoContainer.nativeElement.classList.add('logo-not-at-home');
      }
    });
  }
}
