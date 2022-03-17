import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import User from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';
import { validateRgisterForm } from 'src/utils/validation';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  user: User;
  errorMessage: string;
  loading: boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialog
  ) {
    this.user = {} as User;
    this.errorMessage = '';
    this.loading = false;
  }

  ngOnInit(): void {}
  submitUser() {
    this.resetMassage();
    this.isLoading(true);
    const validate = validateRgisterForm(this.user);
    if (validate.answer) {
      this.userService.addUser(this.user).subscribe(
        (result) => {
          this.signInUser(result.token);
        },
        (error) => {
          this.errorMessage = error.error.detail;
        }
      );
    } else {
      this.errorMessage = validate.message;
    }
    this.isLoading(false);
  }
  isLoading(arg0: boolean) {
    this.loading = arg0;
  }
  signInUser(token: any) {
    localStorage.setItem('token', token);
    this.router.navigate(['/main']);
    this.dialogRef.closeAll();
  }

  resetMassage() {
    this.errorMessage = '';
  }
}
