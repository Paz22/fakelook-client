import { Component, OnInit } from '@angular/core';
import User from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {
    this.user = {} as User;
  }

  ngOnInit(): void {}
  submitUser() {
    this.userService.addUser(this.user).subscribe((result) => {
      console.log(result);
    });
  }
}
