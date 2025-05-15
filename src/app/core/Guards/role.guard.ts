import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { SharedService } from "../services/shared.service";
import { AuthenticationService } from "../services/authentication.service";
import { user } from "../../shared/models/Authentication/User";

@Injectable({
    providedIn: 'root'
})


export class roleGuard implements CanActivate {

    constructor(
        private router: Router,
        private sharedService: SharedService,
        private authService: AuthenticationService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const roles = route.data['roles'] as Array<string>; // required roles
        console.log("Required role are ", roles[0]);

        return this.authService.user$.pipe(
            map((user: user | null) => {
                console.log("RoleGuard: User is ", user?.role);
                if (!user) {
                    console.log("LoginGuard: User is not logged in. login to access the page.");
                    this.sharedService.showNotification(
                        false,
                        "Error",
                        "You are not authorized to access this page. Please login to access the page."
                    );
                    this.router.navigate(['/login']);
                    return false;
                }

                if (!roles || roles.length === 0) {
                    console.log("RoleGuard: No specific roles required for this route. Access granted.");
                    return true;
                }
                if (user.role == null || user.role == "") {
                    console.log("RoleGuard: User does not have any roles. Access denied.");
                    this.sharedService.showNotification(
                        false,
                        "Error",
                        "You do not have any roles to access this page."
                    );
                    return false;
                }
                var RolesOfUser = user.role.split(", ");
                if (roles.length > RolesOfUser.length) {
                    console.log("RoleGuard: User does not have the required roles. Access denied.");
                    this.sharedService.showNotification(
                        false,
                        "Error",
                        "You do not have the required roles to access this page."
                    );
                    return false;
                }
                if (roles.every(role => RolesOfUser.includes(role))) {
                    console.log("RoleGuard: User has the required roles. Access granted.");
                    return true;
                }

                this.sharedService.showNotification(
                    false,
                    "Error",
                    "You do not have the required roles to access this page."
                );
                return false;
            })
        );

    }
}