import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private Apiurl = environment.apiurls;
  constructor(private http: HttpClient) { }
  login(Username: string , Password : string){
    return this.http.post(`${this.Apiurl}/Auth/login`, {Username, Password})
  }
  register(Username: string , Password : string){
    return this.http.post(`${this.Apiurl}/Auth/register`, {Username, Password})
  }

}
