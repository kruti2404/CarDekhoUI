import { Routes, } from '@angular/router';
import { EditComponent } from './features/edit/edit.component';
import { GetVehicleByIdComponent } from './features/get-vehicle-by-id/get-vehicle-by-id.component';
import { FormfilterpartialComponent } from './features/formfilterpartial/formfilterpartial.component';
import { HomeComponent } from './features/home/home.component';
import { VehicleDetailsComponent } from './features/vehicle-details/vehicle-details.component';
import { CreateComponent } from './features/create/create.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { ConfirmEmailComponent } from './Authentication/confirm-email/confirm-email.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'details/:id', component: VehicleDetailsComponent },
    { path: 'GetVehicles', component: GetVehicleByIdComponent },
    { path: 'Filters', component: FormfilterpartialComponent },
    { path: 'create', component: CreateComponent },
    { path: 'Edit/:id', component: EditComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirmemail', component: ConfirmEmailComponent },
]
