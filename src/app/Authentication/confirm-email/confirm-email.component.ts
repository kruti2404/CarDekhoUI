import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEmail } from '../../shared/models/Authentication/ConfirmEmail';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-confirm-email',
  imports: [CommonModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit {

  success = true;

  constructor(private authSevice: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    console.log("Entered the confirm mail ");

    this.activatedRoute.queryParamMap.subscribe({
      next: (params: any) => {
        const confirmEmail: ConfirmEmail = {
          token: params.get('token'),
          email: params.get('email'),
        }
        console.log("Fetching the queryParams ", confirmEmail);

        this.authSevice.confirmEmail(confirmEmail).subscribe({
          next: (response: any) => {
            console.log("confrim mail is successful ", response);
            this.sharedService.showNotification(true, response.value.title, response.value.message);
            this.router.navigateByUrl('/login');
          }, error: error => {
            this.success = false;
            console.log("Error in the ConfirmEmail", error);
            this.sharedService.showNotification(false, "Failed", error.error);
          }
        })
      }
    })
  }

  resendEmailConfirmationLink() {
    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
  }

}
