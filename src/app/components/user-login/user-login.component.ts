import { Component, OnInit } from '@angular/core';
import User from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  userInfo!:User
  constructor(private userService:UserService)
  { 
    this.userInfo = {} as User
  }

  submitUser()
  {
    console.log(this.userInfo)
    this.userInfo.Password="123"
    
      this.userService.addUser(this.userInfo).subscribe((result)=>
      {
        console.log(result);
      })
  }
  ngOnInit(): void {
  }

}
