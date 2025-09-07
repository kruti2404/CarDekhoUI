import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../shared/models/Authentication/Login';
import { BehaviorSubject, map, } from 'rxjs';
import { user } from '../../shared/models/Authentication/User';
import { Register } from '../../shared/models/Authentication/Register';
import { ConfirmEmail } from '../../shared/models/Authentication/ConfirmEmail';
import { ResetPassword } from '../../shared/models/Authentication/ResetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSource = new BehaviorSubject<user | null>(null);
  user$ = this.userSource.asObservable();  
  Loggedin : boolean = false;
  private Apiurl = environment.apiurls;
  constructor(private http: HttpClient) {
  const userString = localStorage.getItem(environment.userKey);
  if (userString) {
    console.log("Rehydrating the Authentication service to set the user observable to the latest user")
    const user = JSON.parse(userString);
    this.setUser(user); 
    this.Loggedin = true;
  }
}


  login(model: Login) {
    console.log("Login method of Authservice");
    return this.http.post<user>(`${this.Apiurl}/api/Auth/login`, model)
      .pipe(
        map((user: user) => {
          if (user) {
            console.log(user);
            this.setUser(user);     
            console.log("The use is seted ");      
          }          
        })
      )
  }

  register(model: Register) {
    return this.http.post(`${environment.apiurls}/api/Auth/register`, model);
  }

  confirmEmail(model: ConfirmEmail) {
    return this.http.put(`${environment.apiurls}/api/auth/confirmemail`, model);
  }

  resendEmailConfirmationLink(email: string) {
    return this.http.post(`${environment.apiurls}/api/auth/resend-email-confirmation-link/${email}`, {});
  }

  forgotUsernameOrPassword(email: string) {
    return this.http.post(`${environment.apiurls}/api/auth/forgot-username-or-password/${email}`, {});
  }
  resetPassword(model: ResetPassword) {
    return this.http.put(`${environment.apiurls}/api/AUTH/reset-password`, model);
  }
  private setUser(user: user) {
    console.log("Set user is called and Setting the user to the User observable")
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }

  getToken(){
    const userString = localStorage.getItem(environment.userKey);
    if (userString) {
      const user = JSON.parse(userString);
      return user.jwt;
    }
    return null;
  }

}
