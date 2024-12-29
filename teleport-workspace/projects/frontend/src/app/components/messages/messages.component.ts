import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  userId: number = 0;
  messageDisplay: boolean = false;
  replyDisplay: boolean = false;
  forwardDisplay: boolean = false;
  replyClicked: boolean = false;
  message: string = "Hello, Mr. HUNDESA? This message is from the landlord, need your response. <strong>yetekerayehewun bet bedenb yaz, bet atsida, atakoshish, gorebet atrebish, Lela lab yachin liji atamtat Hooooooo (gudayhin eziyaw ewuch cherseh na, because Mr. Mesrat eyetekulecheleche new le gorebetih Mr. Mesrat moral asblet enji eretew Hunde endeeeeeeee atrebish enji, embi kalki Mr. Mesrat kireta eyakerebe silehone Betun lekeh tiwotaleh.) <br><br>yih degmo ke akeray ena tekera denboch lay begilt sefrual !!! WOCHEWU GUD <br><br> YOUR AKEREY KALEAB</strong>";
  forward: string = '<i class="fa fa-share text-primary me-2"></i>';

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('userId');
      if (!id) {
        console.error('Error: userId is missing from the route.');
        return;
      }
      this.userId = +id;
      console.log('userId from route:', this.userId); // Log for debugging
    });
  }

  toggleMessageDisplay(): void {
    this.messageDisplay = !this.messageDisplay;
  }

  toggleReply(): void {
    this.replyDisplay = !this.replyDisplay;
    this.replyClicked=true;
  }

  toggleForwardDisplay(): void {
    this.forwardDisplay = !this.forwardDisplay;
  }

  getLandlordMessage(): string {
    return this.message.length > 30 ? this.message.substr(0, 30) + '...' : this.message;
  }

  onSubmit(messageForm: NgForm) {
    if (messageForm.invalid) {
      return;
    }
    const replyData = messageForm.value;
    this.apiService.userreply(this.userId, replyData).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Message Submitted Successfully',
          life: 1000
        });
        setTimeout(() => {
          this.router.navigateByUrl('/main').then();
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
