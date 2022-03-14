import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(public dialog: MatDialog) {
    this.userLogged = false;
    this.showLoginPopUpVab = false;
  }

  ngOnInit(): void {}

  showLoginPopUp() {
    const dialogRef = this.dialog.open(UserLoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showRegisterPopup() {
    const dialogRef = this.dialog.open(UserRegistrationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
