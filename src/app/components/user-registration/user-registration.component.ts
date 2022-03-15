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
    //TODO:REMOVE:
    //this.fillDefaultValues();
  }
  fillDefaultValues() {
    this.user.UserName = 'Default';
    this.user.FirstName = 'Default';
    this.user.LastName = 'Default';
    this.user.Password = 'Default';
    this.user.BirthDate = new Date('0001-01-01');
    this.user.Workplace = 'Default';
    this.user.Address = 'Default';
    this.user.Email = ' Defualt';
    this.user.ProfilePic = 's';
  }

  ngOnInit(): void {}
  submitUser() {
    this.userService.addUser(this.user).subscribe((result) => {
      console.log(result);
    });
  }
}
