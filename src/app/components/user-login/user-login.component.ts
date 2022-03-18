import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import User from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  userInfo!: User;
  loading!: boolean;
  errorMessage!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialog
  ) {
    this.userInfo = {} as User;
    this.loading = false;
    this.errorMessage = '';
  }

  submitUser() {
    this.resetMassage();
    this.isLoading(true);
    this.userService.login(this.userInfo).subscribe(
      (result) => {
        this.signInUser(result.token);
        this.isLoading(false);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.detail;
        this.isLoading(false);
      }
    );
  }

  signInUser(token: any) {
    localStorage.setItem('token', token);
    this.router.navigate(['/main']);
    this.dialogRef.closeAll();
  }
  isLoading(arg0: boolean) {
    this.loading = arg0;
  }

  resetMassage() {
    this.errorMessage = '';
  }
  ngOnInit(): void {}
}
