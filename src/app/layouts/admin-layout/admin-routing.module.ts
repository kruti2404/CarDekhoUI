import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormfilterpartialComponent } from '../../features/formfilterpartial/formfilterpartial.component';
import { CreateComponent } from '../../features/create/create.component';
import { roleGuard } from '../../core/Guards/role.guard';
import { EditComponent } from '../../features/edit/edit.component';
import { VehicleDetailsComponent } from '../../features/vehicle-details/vehicle-details.component';
import { LoginGuard } from '../../core/Guards/Login.guard';

const routes: Routes = [
  { path: 'Filter', component: FormfilterpartialComponent },
  { path: '', redirectTo: 'Filter', pathMatch: 'full' },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [roleGuard],
    data: {
      roles: ["Admin"]
    }
  },
  {
          path: 'details/:id',
          component: VehicleDetailsComponent,
          canActivate: [LoginGuard],
          data: {
              roles: []
          }
      },
  {
    path: 'Edit/:id',
    component: EditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
