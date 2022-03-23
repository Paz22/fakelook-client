import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { NewPostComponent } from '../new-post/new-post.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  userLogged: boolean;
  showLoginPopUpVab: boolean;
  userLoggedIn: boolean;
  userName: any;
  userPicture: any;
  constructor(public dialog: MatDialog, private router: Router) {
    this.userLogged = false;
    this.showLoginPopUpVab = false;
    this.userLoggedIn = false;
  }

  ngOnInit(): void {
    this.checkIfUserIsLogged();
  }
  checkIfUserIsLogged() {
    if (localStorage.getItem('token')) {
      this.userLoggedIn = true;
      this.userName = localStorage.getItem('name');
      this.userPicture = localStorage.getItem('pic');
    } else {
      this.userLoggedIn = false;
      this.userPicture = '';
    }
  }

  showLoginPopUp() {
    const dialogRef = this.dialog.open(UserLoginComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.checkIfUserIsLogged();
    });
  }

  showRegisterPopUp() {
    const dialogRef = this.dialog.open(UserRegistrationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.checkIfUserIsLogged();
    });
  }

  showNewPost() {
    const dialogRef = this.dialog.open(NewPostComponent, {
      height: '50%',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.checkIfUserIsLogged();
    });
  }

  navigateToMap() {
    this.router.navigate(['/main']);
  }
  navigateToFeed() {
    this.router.navigate(['/feed']);
  }
  signOutUser() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.checkIfUserIsLogged();
  }

  openUserSettings() {
    const dialogRef = this.dialog.open(UserSettingsComponent);
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
}
