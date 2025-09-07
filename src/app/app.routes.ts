import { Routes, } from '@angular/router';
import { GetVehicleByIdComponent } from './features/get-vehicle-by-id/get-vehicle-by-id.component';
import { HomeComponent } from './features/home/home.component';
import { VehicleDetailsComponent } from './features/vehicle-details/vehicle-details.component';
import { LoginGuard } from './core/Guards/Login.guard';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
    { path: 'GetVehicles', component: GetVehicleByIdComponent },
    {
        path: 'admin',
        loadChildren: () => import('./layouts/admin-layout/admin.module').then(m => m.AdminModule),
        canActivate: [LoginGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./layouts/auth-layout/auth.module').then(m => m.AuthModule),
    }
    
    
]


