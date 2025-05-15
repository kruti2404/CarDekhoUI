import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { map, Observable, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private sharedService: SharedService,
        private authService: AuthenticationService
    ) { }

  canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot   
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        console.log("LoginGuard: canActivate called");
        return this.authService.user$.pipe(
            map(user => {
                if (user) {
                    this.sharedService.showNotification(
                        true,
                        "Info",
                        "You are already logged in. Please logout to access the login page again."
                    );
                    this.router.navigateByUrl('/'); 
                    return false;
                } else {
                    console.log("LoginGuard: User is not logged in. Allowing access to login page.");
                    return true;
                }
            })
        );
    }
}



