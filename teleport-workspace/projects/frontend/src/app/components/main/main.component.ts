import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'projects/models/user.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user!: User; 
  private sub$ = new Subject<void>();
  constructor(private router: Router,
    private apiService:ApiService,
    private message: MessageService,
    private route:ActivatedRoute) {}

    title='Teleport - Homes';
    isLoggedIn(): boolean {
      return this.apiService.isAuthenticated();
      }
      
      logout() {
       this.apiService.logout().subscribe(res => {
         if (res.success) {
           this.message.add({
             severity: 'info',
             summary: 'Successful',
             detail: 'Logged out',
             life: 1500
           });
          setTimeout(()=>{
            this.router.navigateByUrl('/').then();
          },1500);
   
         }
       });
     }
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
