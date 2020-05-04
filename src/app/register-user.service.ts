import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface User {
  name: string;
}
@Injectable({
  providedIn: 'root'
})

export class RegisterUserService {

constructor(private http: HttpClient) { }

getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>('http://localhost:8000/api/users');
}

// getAllCats(): Observable<Cat[]> {
//   return this.http.get<Cat[]>('http://localhost:8000/api/cats')
// }

// getUser(name: string): Observable<User> {
//   console.log('name of suer in service', name);
//   return this.http.get<User>('http://localhost:8000/api/users/' + name);
// }

postUser(user: User): Observable<User> {
  return this.http.post<User>('http://localhost:8000/api/users/', user);
}

}
