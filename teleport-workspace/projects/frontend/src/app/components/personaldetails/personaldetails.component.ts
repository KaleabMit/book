import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'projects/models/category.interface';
import { Post } from 'projects/models/post.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.css']
})
export class PersonaldetailsComponent implements OnInit {
  personalDetailsForm!: FormGroup;
  imgUrl: any = 'http://localhost:5000/personaldetails/pictures/default.jpg';
  imagePath = this.imgUrl;
  altText: string = '';
  filename = '';
  uploadProgress: number = 0;
  showProgress = false;
  uploadSub: Subscription = new Subscription();
  mainImagePath: string = '';
  categories: Category[] = [];
  post: Post[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.apiService.getAllCategories().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized'));
    this.apiService.getAllPosts().subscribe(posts => this.post = posts.filter(p => p.address));
  }

  initForm(): void {
    this.personalDetailsForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      country: ['', Validators.required],
      checkin: ['', Validators.required],
      checkout: ['', Validators.required],
      identity: ['', Validators.required],
      status: ['', Validators.required],
      children: ['', Validators.required],
      posts: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  preview(ev: any) {
    if (ev.target.files.length === 0) {
      this.imgUrl = 'http://localhost:5000/personaldetails/pictures/default.jpg';
      this.mainImagePath = this.imgUrl;
      return;
    }
    const reader = new FileReader();
    this.imagePath = ev.target.files;
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      this.imgUrl = reader.result;
    };
    this.altText = ev.target.files[0].name;

    const file: File = ev.target.files[0];

    if (file) {
      this.showProgress = true;
      this.uploadProgress = 0;
      this.filename = file.name;
      const formData = new FormData();
      formData.append('file', file); // Use the key 'file' to match the server endpoint
      const upload$ = this.apiService.uploadFile(formData);

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
          if (this.uploadProgress === 100) {
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'File Uploaded',
              life: 2000
            });
          }
        }
        if (event instanceof HttpResponse) {
          const response: any = event.body;
          this.mainImagePath = response.filepath;
          this.imgUrl = response.filepath;
        }
        setTimeout(() => this.showProgress = false, 2000);
      });
    }
  }

  onSubmit(): void {
    if (this.personalDetailsForm.invalid) {
      return;
    }
    const { firstname, lastname, email, phone, country, checkin, checkout, identity, status, children, posts, category } = this.personalDetailsForm.value;

    const detailData = {
      firstname,
      lastname,
      email,
      phone,
      country,
      checkin,
      checkout,
      identity: this.mainImagePath,
      status,
      children:Number(children),
      postsId: Number(posts),
      categoryId: Number(category)
    };

    console.log('Form Data:', detailData); // Log the form data being sent

    this.apiService.personaldetailmessage(detailData).subscribe(
      (Personaldetail) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Message Submitted Successfully',
          life: 1000
        });
        setTimeout(() => {
          this.router.navigateByUrl('/paymenttype').then();
        }, 1000);
      },
      (err: HttpErrorResponse) => {
        console.error('Error Response:', err); // Log the error response
        this.messageService.add({
          severity: 'error',
          summary: `Failed ${err.status}`,
          detail: `${err.statusText}`,
          life: 1000
        });
      }
    );
  }
}
