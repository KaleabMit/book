import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'projects/models/user.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User; 
  private sub$ = new Subject<void>();
  constructor(private router: Router,
    private apiService:ApiService,
    private message: MessageService,
    private route:ActivatedRoute) {}
    
     ngOnInit(): void { 
       this.apiService.getUserObservable().pipe( 
         takeUntil(this.sub$) ).subscribe(
           user => { this.user = user; }); 
         } 
         ngOnDestroy(): void { 
           this.sub$.next(); 
           this.sub$.complete();
         }
}
