import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../Interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: Login[] = [
   {id: 1, userName:'Pedro_Perez1', email:'pedro1@example.com', password:'Pedro123'},
   {id: 2, userName:'Armando_Door2', email:'door2@example.com', password:'Door1234'},
  ];
  private readonly userNameKey = 'userName';
  private readonly userId= 'userId';

  constructor() { }
  getUser(): Observable<any[]> {
    return of(this.user);
  }
  setUserNameToStorage(userName: string,id:number): void {
    localStorage.setItem(this.userNameKey, userName);
    localStorage.setItem(this.userId, id.toString());
  }
   getStoredUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

}
