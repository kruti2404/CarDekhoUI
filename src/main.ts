import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EditComponent } from './app/features/edit/edit.component';
import { GetVehicleByIdComponent } from './app/features/get-vehicle-by-id/get-vehicle-by-id.component';
import { FormfilterpartialComponent } from './app/features/formfilterpartial/formfilterpartial.component';
import { HomeComponent } from './app/features/home/home.component';
import { VehicleDetailsComponent } from './app/features/vehicle-details/vehicle-details.component';
import { CreateComponent } from './app/features/create/create.component';
import { MainLayoutComponent } from './app/layouts/main-layout/main-layout.component';


const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'Details/:id', component: VehicleDetailsComponent },
    { path: 'GetVehicles', component: GetVehicleByIdComponent },
    { path: 'Filters', component: FormfilterpartialComponent },
    { path: 'create', component: CreateComponent },
    { path: 'Edit/:id', component: EditComponent },
]
bootstrapApplication(AppComponent, {
    providers: [
        provideAnimationsAsync(),
        provideRouter(routes),
        importProvidersFrom(HttpClientModule)
    ]

});
