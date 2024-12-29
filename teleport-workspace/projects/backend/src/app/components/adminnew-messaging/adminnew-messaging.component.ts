import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adminnew-messaging',
  templateUrl: './adminnew-messaging.component.html',
  styleUrls: ['./adminnew-messaging.component.css']
})
export class AdminnewMessagingComponent implements OnInit {

  personaldetailId: number = 0; // Default initialization

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('personaldetailId');
      console.log('personaldetailId from route:', id); // Log the retrieved id
      this.personaldetailId = id ? +id : 0; // Safely retrieve personaldetailId
    });
  }

  onSubmit(messageForm: NgForm) {
    if (messageForm.invalid) {
      return;
    }
    const messagingData = messageForm.value;
    console.log('Submitting message data:', messagingData); // Log the form data
    this.apiService.adminmessage(this.personaldetailId, messagingData).subscribe(
      (res) => {
        console.log('Response:', res); // Log the response
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Message Submitted Successfully',
          life: 1000
        });
        setTimeout(() => {
          this.router.navigateByUrl('/tenants').then();
        }, 1000);
      },
      (err: HttpErrorResponse) => {
        console.error('Error submitting message:', err); // Log the error details
        this.messageService.add({
          severity: 'error',
          summary: `Failed ${err.status}`,
          detail: `${err.statusText}`,
          life: 1000
        });
      }
    );
  }
}
