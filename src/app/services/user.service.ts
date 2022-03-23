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

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.usersURL}/Login`, user);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.usersURL}/GetAllUsers`);
  }
}
