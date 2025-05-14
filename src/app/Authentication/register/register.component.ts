import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../core/services/shared.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({})
  submitted = false;
  errorMessages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    // Initialize form data 
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    })
  }

  register() {
    this.submitted = true;
    this.errorMessages = [];
    console.log("Clicked the submit button ");
    if (this.registerForm.valid) {
      console.log("Sending the register post request ");
      this.authService.register(this.registerForm.value).subscribe({

        next: (response: any) => {
          console.log("Response ", response);
          console.log("Registered Successfull");
          this.router.navigateByUrl('/login');
        },
        error: error => {
          console.log("Error ocured in the post request", error.error);
          if (error.error.text = "Email sent for varification.") {
            console.log("Email Sent for varificationnnnnn");
            this.sharedService.showNotification(
              true,
              "Verification Email Sent", 
              "Please check your inbox (and spam/junk folder) to verify your email address."
            );
            this.router.navigateByUrl('/');
          }

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
