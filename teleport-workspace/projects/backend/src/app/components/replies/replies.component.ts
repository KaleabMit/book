import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Reply } from '../../../../../models/reply.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit {

  userId!:number;
  replies: Reply[] = [];
  @ViewChild('dt1', { static: false }) dt1!: Table;
  @ViewChild('search') search!: HTMLInputElement;

  loading: boolean = true;

  constructor(private apiService: ApiService, 
              private messageService: MessageService,
            private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchReplies();
    this.route.paramMap.subscribe(params => {
      const id = params.get('userId');
      this.userId = id ? +id : 0;
      console.log('Navigated to userId:', this.userId);
    });
  }

  fetchReplies(): void {
    this.apiService.getAllReplies().toPromise().then(replies => {
      this.replies = replies || [];
      this.loading = false;
    }).catch(error => {
      console.error('Error fetching replies:', error);
      this.replies = [];
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  filterText(ev: any) {
    this.dt1.filterGlobal(ev.target.value, 'contains');
  }

  removeReplies(id: number) {
    this.apiService.removeReplies(id).subscribe(res => {
      if (res.success) {
        this.replies = this.replies.filter(p => p.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'reply removed',
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
