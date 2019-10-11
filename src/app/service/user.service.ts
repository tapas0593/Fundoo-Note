import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../model/user.model';
import { Login } from '../model/login.model';
import { ResetPassword } from '../model/resetpassword.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private url = "http://localhost:8080/fundoo/";

  registerUser(user: User): any {
    return this.httpClient.post(this.url + "register", user);
  }

  login(login: Login): any {
    return this.httpClient.post(this.url + "login", login);
  }

  forgotPassword(emailId: string) {
    return this.httpClient.get(this.url + "forgotpassword?emailId=" + emailId);
  }

  resetPassword(resetPassword: ResetPassword, token: string) {
    return this.httpClient.put(this.url + "resetpassword/" + token, resetPassword);
  }

  verifyUser(token: string) {
    return this.httpClient.get(this.url + "verify/" + token);
  }
}
