import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDetails, IUserSignIn } from './UserDetails';



export interface User {
  name: string;
}
@Injectable({
  providedIn: 'root'
})

export class RegisterUserService {

  constructor(private http: HttpClient) { }


  postUserDetails(user: IUserDetails): Observable<IUserDetails> {
    return this.http.post<IUserDetails>('http://localhost:3000/users', user);
  }

  // signInUser(user: IUserSignIn): Observable<IUserSignIn> {
  //   return this.http.get<IUserSignIn>('http://localhost:3000/signin', user);
  // }

   signInUser(user: IUserSignIn): Observable<> {
    return this.http.get<IUserSignIn>('http://localhost:3000/signin/' + user.username + '/' + user.password);
  }
}
