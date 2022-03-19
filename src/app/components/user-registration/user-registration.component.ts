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
  @ViewChild('imgPreview') formImagePreview!: any;
  @ViewChild('input[type=file]') formImageInput!: any;

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
          this.signInUser(result.token);

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
  signInUser(token: any) {
    this.showPopupMessage('Register Succefully');

    localStorage.setItem('token', token);
    this.router.navigate(['/main']);
    this.dialogRef.closeAll();
  }

  resetMassage() {
    this.errorMessage = '';
  }
  showPopupMessage(result: string) {
    this._snackBar.open(result, 'Dismiss', {
      duration: 3000,
      panelClass: ['blue-snackbar'],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  changeFile(): void {
    const preview = this.formImagePreview;
    const file = this.formImageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
