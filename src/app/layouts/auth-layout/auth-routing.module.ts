import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../Authentication/login/login.component';
import { RegisterComponent } from '../../Authentication/register/register.component';
import { ConfirmEmailComponent } from '../../Authentication/confirm-email/confirm-email.component';
import { ForgetPasswordComponent } from '../../Authentication/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../Authentication/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmemail', component: ConfirmEmailComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
