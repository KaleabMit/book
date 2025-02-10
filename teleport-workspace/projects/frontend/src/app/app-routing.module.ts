import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { PropertyAgentsComponent } from './components/property-agents/property-agents.component';
import { ReviewsRatesComponent } from './components/reviews-rates/reviews-rates.component';
import { AboutComponent } from './components/about/about.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { AccountComponent } from './components/account/account.component';
import { MainComponent } from './components/main/main.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PersonaldetailsComponent } from './components/personaldetails/personaldetails.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymenttypeComponent } from './components/paymenttype/paymenttype.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReplyComponent } from './components/reply/reply.component';
// import { PostsComponent } from 'projects/backend/src/app/components/posts/posts.component';
// import { NewPostComponent } from 'projects/backend/src/app/components/posts/new-post/new-post.component';
// import { EditPostComponent } from 'projects/backend/src/app/components/posts/edit-post/edit-post.component';
// import { CategoryListComponent } from './components/category-list/category-list.component';
// import { CategoryComponent } from 'projects/backend/src/app/components/category/category.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'post/category/:title',component:HomeComponent},
  {path:'post/detail/:id',component:SinglePostComponent},
  {path:'property-agents',component:PropertyAgentsComponent},
  {path:'reviews-rates',component:ReviewsRatesComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'reviews',component:ReviewsComponent},
  {path:'blogs', component:BlogsComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path: 'password-recovery', component: PasswordRecoveryComponent},
  {path: 'account', component: AccountComponent},
  {path: 'personaldetails', component: PersonaldetailsComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'paymenttype', component: PaymenttypeComponent},
  {path: 'main', component: MainComponent},
  {path:'',component:MainComponent,
    children:[
      {path:'',redirectTo:'posts',pathMatch:'full'},
      {path:'dashboard',component:DashboardComponent},
      {path:'messages/:replyId',component:MessagesComponent},
      {path:'reply', component:ReplyComponent},
      {path: 'profile', component: ProfileComponent},
      {path:'posts',
        children:[
          // {path:'',component:PostsComponent},
          {path:'categories',component:CategoryListComponent},
          // {path:'categories',component:CategoryComponent},
          // {path:'create',component:NewPostComponent},
          // {path:'edit/:id',component:EditPostComponent},
          {path:'**',redirectTo:'',pathMatch:'full'}
        ]
      }
    ]
  },
  
  {path:'**',pathMatch:'full',redirectTo:''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
