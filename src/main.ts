import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { VehicleDetailsComponent } from './app/vehicle-details/vehicle-details.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './app/home/home.component';
import { FormfilterpartialComponent } from './app/formfilterpartial/formfilterpartial.component';
import { GetVehicleByIdComponent } from './app/get-vehicle-by-id/get-vehicle-by-id.component';
import { CreateComponent } from './app/create/create.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: 'Details/:id', component: VehicleDetailsComponent }, 
    { path: 'GetVehicles', component: GetVehicleByIdComponent }, 
    { path: 'Filters', component: FormfilterpartialComponent }, 
    { path: 'create', component: CreateComponent }, 
]
bootstrapApplication(AppComponent, {
    providers: [
        provideAnimationsAsync(),
        provideRouter(routes),
        importProvidersFrom(HttpClientModule)
    ]
    
});
