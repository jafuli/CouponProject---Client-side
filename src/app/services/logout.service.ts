import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  loginStatus: number = 0; // not logged in
  userType: number = 0; // 0 - not logged in, 1 - admin, 2 - company, 3 - customer

  constructor() { }

  setLoginStatus(status: number) {
    this.loginStatus = status;
  }

  setRole(role: number) {
    this.userType = role;
  }
}
