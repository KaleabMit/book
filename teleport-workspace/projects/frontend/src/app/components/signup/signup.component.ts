// import { HttpErrorResponse } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MessageService } from 'primeng/api';
// import { ApiService } from 'projects/tools/src/lib/api.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   constructor(
//     private apiService: ApiService,
//     private message: MessageService,
//     private router: Router
//   ) {}

//   onSubmit(signupForm: NgForm) {
//     if (signupForm.invalid) {
//       return;
//     }
//     const userData = signupForm.value;
//     this.apiService.registerUser(userData).subscribe(
//       (res) => {
//         this.message.add({
//           severity: 'info',
//           summary: 'Success',
//           detail: 'Account Created Successfully',
//           life: 1000
//         });
//         setTimeout(() => {
//           this.router.navigateByUrl('/login').then();
//         }, 1000);
//       },
//       (err: HttpErrorResponse) => {
//         this.message.add({
//           severity: 'error',
//           summary: `Failed ${err.status}`,
//           detail: `${err.statusText}`,
//           life: 1000
//         });
//       }
//     );
//   }
// }

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private router: Router
  ) {}

  onSubmit(signupForm: NgForm) {
    // Check if the form is invalid
    if (signupForm.invalid) {
      this.message.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill out all required fields correctly.',
        life: 2000 // Optional: Adjust life duration for the message
      });
      return; // Stop further execution
    }

    // Extract user data from the form
    const userData = signupForm.value;

    // Call the API to register the user
    this.apiService.registerUser(userData).subscribe(
      (res) => {
        this.message.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Account Created Successfully',
          life: 1000
        });
        setTimeout(() => {
          this.router.navigateByUrl('/login').then();
        }, 1000);
      },
      (err: HttpErrorResponse) => {
        this.message.add({
          severity: 'error',
          summary: `Failed ${err.status}`,
          detail: `${err.statusText}`,
          life: 1000
        });
      }
    );
  }
}
