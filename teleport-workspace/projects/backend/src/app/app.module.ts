import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { PostsComponent } from './components/posts/posts.component';
import { AllPostComponent } from './components/posts/all-post/all-post.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { RepliesComponent } from './components/replies/replies.component';
import { AdminMessagingComponent } from './components/admin-messaging/admin-messaging.component';
import { AdminnewMessagingComponent } from './components/adminnew-messaging/adminnew-messaging.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,  
    FooterComponent,
    MessagesComponent,
    TenantsComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    PostsComponent,
    AllPostComponent,
    NewPostComponent,
    EditPostComponent,
    CategoryComponent,
    RepliesComponent,
    AdminMessagingComponent,
    AdminnewMessagingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    EditorModule,
    InputTextModule,
    ProgressBarModule,
    InputTextareaModule,
    TabViewModule,
    TableModule,
    RouterModule
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }



