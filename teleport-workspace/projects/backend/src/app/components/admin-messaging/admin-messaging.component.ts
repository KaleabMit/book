// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { MessageService } from 'primeng/api';
// import { ApiService } from '../../../../../tools/src/lib/api.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
// import { Reply } from '../../../../../models/reply.interface';

// @Component({
//   selector: 'app-admin-messaging',
//   templateUrl: './admin-messaging.component.html',
//   styleUrls: ['./admin-messaging.component.css']
// })
// export class AdminMessagingComponent implements OnInit {
//   replyDisplay: boolean = false;
//   replyId!: number; // Reply ID passed via URL
//   userId:number=0;
//   reply!: Reply | null; // The specific reply to display
//   loading: boolean = true;

//   constructor(private route: ActivatedRoute, 
//     private apiService: ApiService,
//     private messageService: MessageService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {


//     this.route.paramMap.subscribe(params => {
//       const id = params.get('userId');
//       console.log('userId from route:', id);
//       this.userId = id ? +id : 0;
//     });


   
//     this.replyId = Number(this.route.snapshot.paramMap.get('replyId'));

 
//     this.apiService.getReplyOnlyById(this.replyId).subscribe(
//       (reply) => {
//         this.reply = reply;
//         this.loading = false;
//       },
//       (error) => {
//         console.error('Error fetching reply:', error);
//         this.reply = null;
//         this.loading = false;
//       }
//     );
//   }

//   toggleReplyForm(): void {
//     this.replyDisplay = !this.replyDisplay;
//   }

 

//   onSubmit(messageForm: NgForm) {
//     if (messageForm.invalid || !this.userId || this.userId <= 0) {
//       this.messageService.add({
//         severity: 'error',
//         summary: 'Error',
//         detail: 'Cannot send reply due to invalid data',
//         life: 3000
//       });
//       return;
//     }
  
//     const replyData = messageForm.value;
//     console.log('Payload:', replyData); 
//     this.apiService.userreply(this.userId, replyData).subscribe(
//       (res) => {
//         this.messageService.add({
//           severity: 'info',
//           summary: 'Success',
//           detail: 'Message Submitted Successfully',
//           life: 1000
//         });
//         setTimeout(() => {
//           this.router.navigateByUrl('/replies').then();
//         }, 1000);
//       },
//       (err: HttpErrorResponse) => {
//         this.messageService.add({
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
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Reply } from '../../../../../models/reply.interface';

@Component({
  selector: 'app-admin-messaging',
  templateUrl: './admin-messaging.component.html',
  styleUrls: ['./admin-messaging.component.css'],
})
export class AdminMessagingComponent implements OnInit {
  replyDisplay: boolean = false;
  replyId!: number; // Reply ID passed via URL
  userId: number = 0;
  reply!: Reply | null; // The specific reply to display
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the route parameters
    this.route.paramMap.subscribe((params) => {
      this.replyId = Number(params.get('replyId')) || 0; // Safely get replyId
      this.userId = Number(params.get('userId')) || 0; // Safely get userId

      if (this.replyId > 0) {
        // Fetch the reply details
        this.apiService.getReplyOnlyById(this.replyId).subscribe(
          (reply) => {
            this.reply = reply;
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching reply:', error);
            this.reply = null;
            this.loading = false;
          }
        );
      } else {
        console.error('Invalid replyId:', this.replyId);
        this.loading = false;
      }
    });
  }

  toggleReplyForm(): void {
    this.replyDisplay = !this.replyDisplay;
  }

  onSubmit(messageForm: NgForm) {
    if (messageForm.invalid || this.userId <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Cannot send reply due to invalid data',
        life: 3000,
      });
      return;
    }

    const replyData = messageForm.value;
    console.log('Payload:', replyData); // Debugging payload
    this.apiService.userreply(this.userId, replyData).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Message Submitted Successfully',
          life: 1000,
        });
        setTimeout(() => {
          this.router.navigateByUrl('/replies').then();
        }, 1000);
      },
      (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: `Failed ${err.status}`,
          detail: `${err.statusText}`,
          life: 1000,
        });
      }
    );
  }
}
