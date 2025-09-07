import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { map, Observable, take } from 'rxjs';
import { user } from '../../shared/models/Authentication/User';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    loginstatus : boolean = false;  
    constructor(
        private router: Router,
        private sharedService: SharedService,
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.loginstatus = this.authService.Loggedin;
        
    }
    ngOnChanges(): void {
        this.loginstatus = this.authService.Loggedin;
        
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log("LoginGuard: canActivate called");
        if (this.authService.Loggedin) {
            return true;
        }
        else {
            this.sharedService.showNotification(false, "Failed", "You need to login to access this page");
            this.router.navigateByUrl('/auth');
            return false;
        }
    }
}



