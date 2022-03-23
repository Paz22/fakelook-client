import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  firstPassword!: number;
  secondPassword!: number;
  msg: string = '';

  constructor(private ref: MatDialogRef<ResetPasswordComponent>) {}

  ngOnInit(): void {}

  sendPassword() {
    if (this.firstPassword != this.secondPassword) {
      this.msg = 'Passwords Are Not Matching';
    } else {
      this.msg = '';
      this.ref.close(this.firstPassword);
    }
  }
}
