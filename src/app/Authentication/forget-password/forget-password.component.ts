import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { SharedService } from '../../core/services/shared.service';
// import { ValidationMessageComponent } from '../../core/Components/validation-message/validation-message.component';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {

  emailForm: FormGroup = new FormGroup({});
  submitted = false;
  mode: string | undefined;
  errorMessages: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
    })
  }

  sendEmail() {
    console.log("Submited the request");
    this.submitted = true;
    this.errorMessages = [];
    console.log("Request is being sent for the forgot password or mail ");

    this.authService.forgotUsernameOrPassword(this.emailForm.get('email')?.value).subscribe({
      next: (response: any) => {
        console.log("Next is executed ", response);
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

  cancel() {
    this.router.navigateByUrl('/login');
  }


}
