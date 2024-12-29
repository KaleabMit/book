import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PropertyAgentsComponent } from './components/property-agents/property-agents.component';
import { ReviewsRatesComponent } from './components/reviews-rates/reviews-rates.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ClientFeedbackComponent } from './components/client-feedback/client-feedback.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { AccountComponent } from './components/account/account.component';
import { MainComponent } from './components/main/main.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { PersonaldetailsComponent } from './components/personaldetails/personaldetails.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommonModule } from '@angular/common';
import { ReplyComponent } from './components/reply/reply.component';
// import { CategoryComponent } from '../../../backend/src/app/components/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SinglePostComponent,
    CategoryListComponent,
    PropertyAgentsComponent,
    ReviewsRatesComponent,
    AboutComponent,
    BlogsComponent,
    ClientFeedbackComponent,
    ContactComponent,
    MessagesComponent,
    ReviewsComponent,
    SignupComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    AccountComponent,
    MainComponent,
    ImageSliderComponent,
    PersonaldetailsComponent,
    ProfileComponent,
    ReplyComponent,
    

    
    // CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    MenubarModule,
    ButtonModule,
    EditorModule,
    InputTextModule,
    ProgressBarModule,
    InputTextareaModule,
    TabViewModule,
    TableModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
