import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService:ApiService,
              private message:MessageService,
              private router:Router
  ) { }

  ngOnInit(): void {
  }

  userLogin(login:NgForm){
    if(login.invalid){
      return;
    }
    const loginData={email:login.value.email,password:login.value.password};
    //api service for authentication

    this.apiService.login(loginData.email,loginData.password).subscribe(
      (res)=>{
        if((res.user.roles === 'Admin' || res.user.roles === 'Reader') && res.success){
          this.apiService.setUser(res.user);  
          this.message.add({
              severity:'info',
              summary:'success',
              detail:'Authentication Successful',
              life:1000
             });
             setTimeout(()=>{
              this.router.navigateByUrl('/').then();
             },1000)
        } else{
          this.message.add({
            severity:'error',
            summary:'Falied Attempts',
            detail:'You are not authorised to view this page.',
            life:1000
           });
        }
      },
       (err:HttpErrorResponse)=>{
        this.message.add({
          severity:'error',
          summary:`Falied ${err.status}`,
          detail:`${err.statusText}`,
          life:1000
         });
        //  this.router.navigateByUrl('/login').then();
       }
    );
  }

}
