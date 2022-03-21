import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../Model/User';



const PASSWORD="1";
const FIRSTNAME="2";
const SURNAME="3";
const EMAIL="4";
const PROFILEPIC="5";
const ADDRESS="6";
const WORKPLACE="7";
const USERNAME="8";


@Injectable({
  providedIn: 'root',
})


export class UserService {

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<any>(
      `${environment.usersURL}/Register`,
      user,
      httpOptions
    );
  }

  changeUserSettings(user:User,newVal:any,changeCode:string)
  {
    switch(changeCode)
    {
      case(PASSWORD): 
      {
        user.Password=newVal;
        return user;
      }
      case(FIRSTNAME): 
      {
        user.FirstName=newVal;
        return user;
      }
      case(SURNAME): 
      {
        user.LastName=newVal;
        return user;
      }
      case(EMAIL):
      {
        user.Email=newVal;
        return user;
      }
      case(PROFILEPIC):
      {
        user.ProfilePic=newVal;
        return user;
      }
      case(ADDRESS):
      {
        user.Address=newVal;
        return user;
      }
      case(WORKPLACE):
      {
        user.Workplace=newVal;
        return user;
      }
      case(USERNAME):
      {
        user.UserName=newVal;
        return user;
      }
      default:
      {
        return null;
      }
    }
  }

  updateUserSettings(newVal:string,code:string)
  {
   let user$ = this.http.get<User>(`${environment.usersURL}/api/UserAPI/GetById?id=${localStorage.getItem('id')||""}`); 
   user$.subscribe((result)=>
   {
     if(code == USERNAME) //No username duplicity
     {
       this.http.post<boolean>(`${environment.usersURL}/api/UserAPI/checkUserNameValidity`,newVal).subscribe((isExist)=>
       {
         if(isExist)
         {
           
         }
       });
     }
     let updatedUser=this.changeUserSettings(result,newVal,code);
     this.http.put<User>(`${environment.usersURL}/Put`,updatedUser).subscribe((res)=>
     {
        console.log(res);
     });     
  }) 
  }  

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.usersURL}/Login`, user);
  }
}
