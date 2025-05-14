import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../shared/models/Authentication/Login';
import { map, ReplaySubject } from 'rxjs';
import { user } from '../../shared/models/Authentication/User';
import { Register } from '../../shared/models/Authentication/Register';
import { ConfirmEmail } from '../../shared/models/Authentication/ConfirmEmail';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSource = new ReplaySubject<user | null>(1);
  user$ = this.userSource.asObservable();

  private Apiurl = environment.apiurls;
  constructor(private http: HttpClient) { }

  login(model: Login) {
    return this.http.post<user>(`${this.Apiurl}/api/Auth/login`, model)
      .pipe(
        map((user: user) => {
          if (user) {
            console.log(user);
            this.setUser(user);
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

  private setUser(user: user) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }

}
