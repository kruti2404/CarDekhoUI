import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { SharedService } from '../../core/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from '../../shared/models/Authentication/ResetPassword';
// import { ValidationMessageComponent } from '../../core/Components/validation-message/validation-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup({});
  token: string | undefined;
  email: string | undefined;
  submitted = false;
  errorMessages: string[] = [];

  constructor(private authServices: AuthenticationService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe({
      next: (params: any) => {
        this.token = params.get('token');
        this.email = params.get('email');

        if (this.token && this.email) {
          this.initializeForm(this.email);
        } else {
          this.router.navigateByUrl('/login');
        }
      }
    });
  }


  initializeForm(username: string) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [{ value: username, disabled: true }],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }

  resetPassword() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.resetPasswordForm.valid && this.email && this.token) {
      const model: ResetPassword = {
        token: this.token,
        email: this.email,
        newPassword: this.resetPasswordForm.get('newPassword')?.value
      };

      
      this.authServices.resetPassword(model).subscribe({
        next: (response: any) => {
          this.sharedService.showNotification(true, response.value.title, response.value.message);
          this.router.navigateByUrl('/login');
        }, error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
        }
      })
    }
  }
}
