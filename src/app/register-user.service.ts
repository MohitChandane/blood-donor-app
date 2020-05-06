import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDetails } from './UserDetails';



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

}
