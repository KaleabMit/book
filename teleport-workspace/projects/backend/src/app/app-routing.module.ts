import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { CategoryComponent } from './components/category/category.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { AuthGuard } from 'projects/tools/src/lib/guards/auth.guard';
import { AdminGuard } from 'projects/tools/src/lib/guards/admin.guard';
import { MessagesComponent } from './components/messages/messages.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { RepliesComponent } from './components/replies/replies.component';
import { AdminnewMessagingComponent } from './components/adminnew-messaging/adminnew-messaging.component';
import { AdminMessagingComponent } from './components/admin-messaging/admin-messaging.component';

const routes: Routes = [
  {path:'',component:MainComponent,
    canActivate:[AuthGuard,AdminGuard],
    children:[
      {path:'',redirectTo:'posts',pathMatch:'full'},
      {path:'dashboard',component:DashboardComponent},
      {path:'messages', component:MessagesComponent},
      {path:'tenants', component:TenantsComponent},
      {path:'replies', component:RepliesComponent},
      {path:'admin-messaging/:userId', component:AdminMessagingComponent},
      {path:'adminnew-messaging',component:AdminnewMessagingComponent},
      {path:'adminnew-messaging/:personaldetailId', component:AdminnewMessagingComponent},  // Add this line
      {path:'posts',
        children:[
          {path:'',component:PostsComponent},
          {path:'categories',component:CategoryComponent},
          {path:'create',component:NewPostComponent},
          {path:'edit/:id',component:EditPostComponent},
          {path:'**',redirectTo:'',pathMatch:'full'}
        ]
      }
    ]
  },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
