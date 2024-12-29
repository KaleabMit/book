import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Message } from '../../../../../models/message.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  @ViewChild('dt1', { static: false }) dt1!: Table;
  @ViewChild('search') search!: HTMLInputElement;

  loading: boolean = true;

  constructor(private apiService: ApiService, 
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.apiService.getAllMessages().toPromise().then(messages => {
      this.messages = messages || [];
      this.loading = false;
    }).catch(error => {
      console.error('Error fetching messages:', error);
      this.messages = [];
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  filterText(ev: any) {
    this.dt1.filterGlobal(ev.target.value, 'contains');
  }

  removeMessage(id: number) {
    this.apiService.removeMessage(id).subscribe(res => {
      if (res.success) {
        this.messages = this.messages.filter(p => p.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Message removed',
          life: 1500
        });
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error removing message:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to remove message',
        life: 1500
      });
    });
  }
}
