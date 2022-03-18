import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  userLogged: boolean;
  showLoginPopUpVab: boolean;
  userLoggedIn: boolean;
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
    } else this.userLoggedIn = false;
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

  navigateToMap() {
    this.router.navigate(['/main']);
  }
  signOutUser() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.checkIfUserIsLogged();
  }
}
