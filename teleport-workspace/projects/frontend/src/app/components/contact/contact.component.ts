import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(messageForm: NgForm) {
    if (messageForm.invalid) {
      return;
    }
    const messageData = messageForm.value;
    this.apiService.usermessage(messageData).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Message Submitted Successfully',
          life: 1000
        });
        setTimeout(() => {
          this.router.navigateByUrl('/').then();
        }, 1000);
      },
      (err: HttpErrorResponse) => {
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
