import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private sharedService: SharedService
    ) { }

    canActivate(): boolean {
        const userString = localStorage.getItem(environment.userKey);
        console.log("Login guard is called");
        if (userString) {
            const user = JSON.parse(userString);
            if (user) {
                this.router.navigate(['/Filters']);
                this.sharedService.showNotification(true, "Info", "You are already logged in.Please logout to login with another account.");
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }

    }
}