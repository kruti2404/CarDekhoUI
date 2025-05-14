import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  emailForm: FormGroup = new FormGroup({});
  submitted = false;
  mode: string | undefined;
  errorMessages: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private sharedService: SharedService
  ) { }

  sendEmail() {
    this.submitted = true;
    this.errorMessages = [];

    this.authService.forgotUsernameOrPassword(this.emailForm.get('email')?.value).subscribe({
      next: (response: any) => {
        this.sharedService.showNotification(true, response.title, response.message);
        this.router.navigateByUrl('/account/login');
      }, error: error => {
        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {
          this.errorMessages.push(error.error);
        }
      }
    })

  }

  cancel() {
    this.router.navigateByUrl('/account/login');
  }


}
