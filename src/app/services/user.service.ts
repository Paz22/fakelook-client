import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.usersURL}/Login`, user);
  }
}
