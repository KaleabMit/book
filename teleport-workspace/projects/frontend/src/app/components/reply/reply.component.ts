import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Reply } from '../../../../../models/reply.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

 
  replies: Reply[] = [];
  filteredReplies: Reply[] = [];

  @ViewChild('dt1', { static: false }) dt1!: Table;

  loading: boolean = true;
  currentUserId: number = 0; // Set this to the authenticated user's ID.

  constructor(private apiService: ApiService, 
              private messageService: MessageService) {}

  ngOnInit(): void {
    const user = this.apiService.getUser();
    if (user) {
      this.currentUserId = user.id;
      this.fetchRepliesForCurrentUser();
    }
  }
  

  fetchRepliesForCurrentUser(): void {
    this.apiService.getAllReplies().toPromise().then(replies => {
      this.replies = replies || [];
      this.filteredReplies = this.replies.filter(reply => reply.userId  === this.currentUserId);
      this.loading = false;
    }).catch(error => {
      console.error('Error fetching replies:', error);
      this.replies = [];
      this.filteredReplies = [];
      this.loading = false;
    });
  }

  removeReplies(id: number) {
    this.apiService.removeReplies(id).subscribe(res => {
      if (res.success) {
        this.replies = this.replies.filter(p => p.id !== id);
        this.filteredReplies = this.filteredReplies.filter(p => p.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Reply removed',
          life: 1500
        });
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error removing reply:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to remove reply',
        life: 1500
      });
    });
  }
}
