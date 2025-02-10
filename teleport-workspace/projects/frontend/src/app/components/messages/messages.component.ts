import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Reply } from '../../../../../models/reply.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  replyId!: number; // Reply ID passed via URL
  reply!: Reply | null; // The specific reply to display
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    // Retrieve the replyId from the route parameters
    this.replyId = Number(this.route.snapshot.paramMap.get('replyId'));

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
  }
}
