import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../Model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<User>(
      `${environment.usersURL}/Register`,
      user,
      httpOptions
    );
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.usersURL}/Login`, user);
  }

  resetPassword(newPass:string)
  {
   let user$ = this.http.get<User>(`${environment.usersURL}/api/UserAPI/GetById?id=${localStorage.getItem('id') || ''}`); 
   user$.subscribe((result)=>
   {
     result.Password=newPass;
     this.http.put<User>(`${environment.usersURL}/Put`,result)
  }) 
  }

 


}
