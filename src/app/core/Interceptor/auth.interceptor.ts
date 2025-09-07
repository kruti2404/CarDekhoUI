import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor is called with url like ", req);
    const loginstatus = this.authService.Loggedin;
    console.log("Login status in interceptor: ", loginstatus);

    if (loginstatus) {
      const token = this.authService.getToken();
      console.log("Interceptor: attaching token", token);

      const modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Interceptor: sending modified request with token and request is, ", modifiedReq);
      return next.handle(modifiedReq);
    }

    console.log("Interceptor: sending unmodified request");
    return next.handle(req);
  }
}
