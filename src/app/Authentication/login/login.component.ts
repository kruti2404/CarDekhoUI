import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { user } from '../../shared/models/Authentication/User';
import { take } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { SharedService } from '../../core/services/shared.service';


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

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.returnUrl = params.get('returnUrl');
      console.log('Return URL:', this.returnUrl);
    });

    this.authService.user$.pipe(take(1)).subscribe({
      next: (user: user | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        }
      }
    });
  }


  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: _ => {
          console.log("Logged in ", _);
          if (this.returnUrl) {
            console.log("Return Url is ", this.returnUrl)
            this.router.navigateByUrl(this.returnUrl);
          } else {

            this.router.navigateByUrl('/');
          }

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
