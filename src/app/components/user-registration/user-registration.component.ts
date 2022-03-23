import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  file: any;
  @ViewChild('input[type=file]') formImageInput!: any;
  imgSrc = '../../../assets/Images/user-login-avatar.png';
  imgFile?: File;
  constructor(
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar
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
          this.signInUser(result);

          this.isLoading(false);
        },
        (error) => {
          this.errorMessage = error.error.detail;
          this.isLoading(false);
        }
      );
    } else {
      this.errorMessage = validate.message;
      this.isLoading(false);
    }
  }
  isLoading(arg0: boolean) {
    this.loading = arg0;
  }
  signInUser(result: any) {
    this.showPopupMessage('Register Succefully');
    console.log(result);
    localStorage.setItem('token', result.token);
    localStorage.setItem('id', result.id);
    localStorage.setItem('name', result.userName),
      localStorage.setItem('pic', result.profilePic);
    this.router.navigate(['/feed']);
    this.dialogRef.closeAll();
  }

  resetMassage() {
    this.errorMessage = '';
  }
  showPopupMessage(result: string) {
    this._snackBar.open(result, 'Dismiss', {
      duration: 3000,
      panelClass: ['blue-snackbar'],
      verticalPosition: 'top',
    });
  }

  changeImage(event: any): void {
    this.imgFile = event.target.files[0];
    if (this.imgFile) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
        this.user.profilePic = this.imgSrc;
      };
      reader.readAsDataURL(this.imgFile);
    }
  }
}
