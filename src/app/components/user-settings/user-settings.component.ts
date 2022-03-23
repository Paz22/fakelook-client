import { getLocaleFirstDayOfWeek } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import User from 'src/app/Model/User';
//import User from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

const PASSWORD="1";
const FIRSTNAME="2";
const SURNAME="3";
const EMAIL="4";
const PROFILEPIC="5";
const ADDRESS="6";
const WORKPLACE="7";
const USERNAME="8";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  imgSrc = '../../../assets/Images/user-login-avatar.png';
  imgFile?: File;
  user:User;
  msg!:string;
  userTask!:any;

  constructor(private userService:UserService,public ref: MatDialogRef<UserSettingsComponent>, public dialog: MatDialog) { 
    this.user ={} as User
  }

  ngOnInit(): void
  {
   this.showUserSettings();
  }

 
  resetPassword()
  {
    const dialogRef = this.dialog.open(ResetPasswordComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.user.password=result;
      this.updateUserSetting();
    });
  }

  updateUserSetting()
  {   
    this.userService.updateUser(this.userTask).subscribe((res)=>
    {
      console.log(res);
      if(res==null)
      {
        this.msg="Illegal UserName";
        
      }
      else
      {
        localStorage.setItem('name',this.userTask.userName);
        this.dialog.closeAll();
      }
    });
  }

  showUserSettings()
  {
   
   this.userService.getUserById().subscribe((result)=>
   {
 
     this.userTask=result;
     this.user = result;
     console.log(this.user as any);
     console.log(result)    

     
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
