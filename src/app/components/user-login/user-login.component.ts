import { Component, OnInit } from '@angular/core';
import User from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  userInfo!: User;
  constructor(private userService: UserService) {
    this.userInfo = {} as User;
  }

  submitUser() {
    console.log(this.userInfo);

    this.userService.login(this.userInfo).subscribe((result) => {
      console.log(result);
    });
  }
  ngOnInit(): void {}
}
