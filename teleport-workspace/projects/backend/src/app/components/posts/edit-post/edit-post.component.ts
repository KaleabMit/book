import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'projects/models/post.interface';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Category } from 'projects/models/category.interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  // @ts-ignore
  post: Post;
  imgUrl: any = 'https://i0.wp.com/clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg?ssl=1';
  imagePath = this.imgUrl;
  altText: string = '';
  filename = '';
  uploadProgress: number = 0;
  showProgress = false;
  uploadSub: Subscription = new Subscription();
  mainImagePath: string = '';
  categories: Category[] = [];

  constructor(private apiService: ApiService,
              private message: MessageService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      if (id) {
        this.apiService.getPostById(id).subscribe(post => {
          this.post = post;
          this.imgUrl = this.post.photo;
          this.mainImagePath = this.post.photo;
        });
      }
    });

    this.apiService.getAllCategories().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized'));
  }

  previewImage(ev: any) {
    if (ev.target.files.length === 0) {
      this.imgUrl = 'https://i0.wp.com/clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg?ssl=1';
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
      formData.append('file', file); // Ensure the key matches the server endpoint
      const upload$ = this.apiService.uploadFile(formData);

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
          if (this.uploadProgress === 100) {
            this.message.add({
              severity: 'info', summary: 'Success',
              detail: 'File Uploaded', life: 2000
            });
          }
        }
        if (event instanceof HttpResponse) {
          const response: any = event.body;
          this.mainImagePath = response.filepath;
          this.post.photo = this.mainImagePath;
        }
        setTimeout(() => this.showProgress = false, 2000);
      });
    }
  }

  sanitizeContent(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }

  updatePost() {
    this.post.address = this.sanitizeContent(this.post.address);

    this.apiService.updatePost(this.post.id, this.post).subscribe(res => {
      this.message.add({
        severity: 'info',
        summary: 'Successful',
        detail: 'Post updated',
        life: 1500
      });
    }, (err: HttpErrorResponse) => {
      this.message.add({
        severity: 'error',
        summary: 'Failure',
        detail: err.statusText,
        life: 1500
      });
    });
  }
}
