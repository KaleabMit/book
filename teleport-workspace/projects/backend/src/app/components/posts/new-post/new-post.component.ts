import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subscription } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Category } from 'projects/models/category.interface';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  imgUrl: any = 'http://localhost:5000/posts/pictures/default.jpg';
  imagePath = this.imgUrl;
  altText: string = '';
  filename = '';
  uploadProgress: number = 0;
  showProgress = false;
  uploadSub: Subscription = new Subscription();
  mainImagePath: string = '';
  categories: Category[] = [];

  constructor(private apiService: ApiService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.apiService.getAllCategories().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized'));
  }

  preview(ev: any) {
    if (ev.target.files.length === 0) {
      this.imgUrl = 'http://localhost:5000/posts/pictures/default.jpg';
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
              severity: 'info', summary: 'Success',
              detail: 'File Uploaded', life: 2000
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

  sanitizeContent(content: string): string {
    return content.replace(/<\/?p[^>]*>/g, "");  // Removes <p> tags and their attributes
  }

  createPost(myForm: NgForm) {
    if (myForm.invalid) {
      return;
    }
    const { type, price, specialprice, area, bed, bath, wifi, category, address } = myForm.value;
    console.log(this.mainImagePath);
    // Sanitize the address field
    const sanitizedAddress = this.sanitizeContent(address);

    const formData = {
      type,
      price,
      specialprice,
      area,
      bed,
      bath,
      wifi,
      categoryId: parseInt(category),
      address: sanitizedAddress,
      photo: this.mainImagePath
    };

    this.apiService.createPost({ ...formData }).subscribe(post => {
      this.messageService.add({
        severity: 'info',
        detail: 'Post Created',
        summary: 'Done',
        life: 2000
      });
      myForm.reset();
    });
  }
}
