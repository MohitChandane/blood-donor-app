import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDetails, IUserSignIn } from './UserDetails';
import { userInfo } from 'os';



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
    console.log('editedDetails -- ', editedDetails);
    return this.http.patch<IUserDetails>('http://localhost:3000/users/' + editedDetails.username, editedDetails);
  }
}
