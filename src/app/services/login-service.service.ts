import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private client: HttpClient) { }

  login(email: string, password: string, type: string) {
    return this.client.get("http://localhost:8080/client/login/" + email + "/" + password + "/" + type, { responseType: 'text' });
  }

  logout(token: string) {
    return this.client.get("http://localhost:8080/client/logout/" + token, { responseType: 'text' });
  }


}
