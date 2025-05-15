import { Routes, } from '@angular/router';
import { EditComponent } from './features/edit/edit.component';
import { GetVehicleByIdComponent } from './features/get-vehicle-by-id/get-vehicle-by-id.component';
import { HomeComponent } from './features/home/home.component';
import { VehicleDetailsComponent } from './features/vehicle-details/vehicle-details.component';
import { CreateComponent } from './features/create/create.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { ConfirmEmailComponent } from './Authentication/confirm-email/confirm-email.component';
import { ForgetPasswordComponent } from './Authentication/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Authentication/reset-password/reset-password.component';
import { LoginComponent } from './Authentication/login/login.component';
import { LoginGuard } from './core/Guards/Login.guard';
import { roleGuard } from './core/Guards/role.guard';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    {
        path: 'details/:id',
        component: VehicleDetailsComponent,
        canActivate: [roleGuard],
        data: {
            roles: []
        }
    },
    { path: 'GetVehicles', component: GetVehicleByIdComponent },
    {
        path: 'Filters',
        loadComponent: () => import('./features/formfilterpartial/formfilterpartial.component').then(mod => mod.FormfilterpartialComponent),
        canActivate: [roleGuard],
        data: {
            roles: ["User"]
        }
    },
    {
        path: 'create',
        component: CreateComponent,
        canActivate: [roleGuard],
        data: {
            roles: ["Admin"]
        }
    },
    { path: 'Edit/:id', component: EditComponent },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]

    },
    { path: 'register', component: RegisterComponent },
    { path: 'confirmemail', component: ConfirmEmailComponent },
    { path: 'forgetpassword', component: ForgetPasswordComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
]


