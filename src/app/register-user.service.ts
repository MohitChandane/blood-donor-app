import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDetails, IUserSignIn, IReqZipcode } from './UserDetails';



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

  signInUser(user: IUserSignIn): Observable<any> {
    return this.http.get<IUserSignIn>('http://localhost:3000/signin/' + user.username + '/' + user.password);
  }

  updateUserInfo(editedDetails: IUserDetails): Observable<any> {
    return this.http.patch<IUserDetails>('http://localhost:3000/users/' + editedDetails.username, editedDetails);
  }

  getUserDetails(): Observable<any> {
    return this.http.get<IUserDetails>('http://localhost:3000/users');
  }

  postRequesterData(user: IReqZipcode): Observable<any> {
    console.log('user in postRequesterData -- ', user);
    return this.http.post<any>('http://localhost:3000/fetchusers', user);
  }
}
