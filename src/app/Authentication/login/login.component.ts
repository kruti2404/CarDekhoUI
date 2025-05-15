import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { SharedService } from '../../core/services/shared.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  returnUrl: string | null = null;
  private userSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    
  }

  login() {
    console.log("loging clicked");
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (value) => {
          console.log("Logged in ", value);
          this.sharedService.showNotification(true, "Success", "You have successfully logged in");

          this.router.navigateByUrl('/Filters');
          // this.authService.
        },
        error: (err) => {
          console.log("Error", err);
          this.sharedService.showNotification(false, "Failed", err.error);
        },

      });
    }
    console.log("login");
  }
}
