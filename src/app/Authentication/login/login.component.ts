import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../core/services/shared.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
// import { ToastStyle } from 'primeng/toast/style/toaststyle.d.ts';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, CommonModule, RouterLink,Toast],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  returnUrl: string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private sharedService: SharedService,
    private router: Router,
    private messageService: MessageService
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
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'You have successfully logged in', life: 30000 });
          // this.sharedService.showNotification(true, "Success", "You have successfully logged in");

          this.router.navigateByUrl('/admin');
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
