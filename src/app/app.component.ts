import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent, } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { AuthenticationService } from './core/services/authentication.service';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule,AdminLayoutComponent, AuthLayoutComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    loginstatus: boolean = false;
    constructor(private authService: AuthenticationService,) { }

    ngOnInit() {
        console.log("App component initialized");
        console.log("Loggin status ",this.authService.Loggedin);
        this.loginstatus = this.authService.Loggedin;
    }
}