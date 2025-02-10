import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../../models/user.interface';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.interface';
import { Category } from '../../../models/category.interface';
import { Personaldetail } from 'projects/models/personaldetail.interface';
import { Message } from 'projects/models/message.interface';
import { Reply } from 'projects/models/reply.interface';
import { AdminMessaging } from '../../../models/adminmessaging.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'http://localhost:5000';
  private authState$ = new BehaviorSubject<boolean>(false);
  private user: User = {
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    photo: '',
    roles: ''
  };
  private user$ = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthStatus();
  }

  private async initializeAuthStatus(): Promise<void> {
    try {
      const res = await this.http.get<{ status: boolean, user: User }>(`${this.URL}/auth/authstatus`).toPromise();
      if (res) {
        this.authState$.next(res.status ?? false);
        if (res.status) {
          this.user = res.user ?? this.user;
          this.user$.next(this.user);
          this.setUser(this.user);
          await this.router.navigateByUrl('/');
        }
      }
    } catch (error) {
      console.error('Error initializing authentication status:', error);
    }
  }

  // Authentication Methods
  isAuthenticated(): boolean {
    return this.authState$.getValue();
  }

  getAuthState(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  getUserObservable(): Observable<User> {
    return this.user$.asObservable();
  }

  registerUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.URL}/auth/register`, userData, {
      withCredentials: true
    });
  }

  usermessage(messageData: Message): Observable<Message> {
    return this.http.post<Message>(`${this.URL}/message`, messageData, {
      withCredentials: true
    });
  }

  userreply(userId:number, replyData: Reply): Observable<Reply> {
    return this.http.post<Reply>(`${this.URL}/reply/${userId}`, replyData, { 
      withCredentials: true
    });
  }
  
  adminmessage(personaldetailId: number, messagingData: AdminMessaging): Observable<AdminMessaging> {
    return this.http.post<AdminMessaging>(`${this.URL}/admin-messaging/${personaldetailId}`, messagingData, {
      withCredentials: true
    });
  }


  personaldetailmessage(detailData: any): Observable<Personaldetail> {
    return this.http.post<Personaldetail>(`${this.URL}/personaldetails`, detailData, {
       headers: new HttpHeaders({
         'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }
  

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth/login`, { email, password }, {
      withCredentials: true
    }).pipe(
      tap((value) => {
        if (value.success) {
          this.authState$.next(true);
          this.user$.next(value.user);
        } else {
          this.authState$.next(false);
        }
      })
    );
  }

  logout(): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.URL}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(res => {
        if (res.success) {
          this.authState$.next(false);
          this.user$.next({
            email: '',
            id: -1,
            firstname: '',
            lastname: '',
            photo: '',
            roles: ''
          });
          localStorage.removeItem('user');
          // this.router.navigateByUrl('/login');
        }
      })
    );
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(<string>localStorage.getItem('user'));
  }

  // Other API Methods
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}/posts`);
  }
  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.URL}/message`);
  }

  getAllReplies(): Observable<Reply[]> {
    return this.http.get<Reply[]>(`${this.URL}/reply`);
}

getReplyById(id: number): Observable<Reply> {
    return this.http.get<Reply>(`${this.URL}/reply/${id}`);
}

removeReplies(id: number): Observable<{ success: boolean }> { 
    return this.http.delete<{ success: boolean }>(`${this.URL}/reply/${id}`);
}


  getPostById(id: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/posts/${id}`);
  }
  
  getAllPersonaldetails(): Observable<Personaldetail[]> { 
    return this.http.get<Personaldetail[]>(`${this.URL}/personaldetails`); 
  } 
  
  removePersonaldetail(id: number): Observable<{ success: boolean }> { 
    return this.http.delete<{ success: boolean }>(`${this.URL}/personaldetails/${id}`);
  }


  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }

  createCategory(title: string, photo: string): Observable<Category> {
    return this.http.post<Category>(`${this.URL}/category`, { title, photo }, {
      withCredentials: true
    });
  }

  updateCategory(id: number, title: string, photo: string): Observable<Category> {
    return this.http.patch<Category>(`${this.URL}/category/${id}`, { title, photo }, {
      withCredentials: true
    });
  }

  updatePost(id: number, postData: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.URL}/posts/${id}`, postData, {
      withCredentials: true
    });
  }

  removeCategory(id: number): Observable<{ success: boolean, category: Category }> {
    return this.http.delete<{ success: boolean, category: Category }>(`${this.URL}/category/${id}`, {
      withCredentials: true
    });
  }

  removePost(id: number): Observable<{ success: boolean, post: Post }> {
    return this.http.delete<{ success: boolean, post: Post }>(`${this.URL}/posts/${id}`, {
      withCredentials: true
    });
  }

  removeMessage(id: number): Observable<{ success: boolean, message: Message }> {
    return this.http.delete<{ success: boolean, message: Message }>(`${this.URL}/message/${id}`, {
      withCredentials: true
    });
  }

  createPost(formData: any): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, formData, {
      withCredentials: true
    });
  }

  uploadFile(form: FormData): Observable<any> {
    return this.http.post<any>(`${this.URL}/posts/upload-photo`, form, {
      reportProgress: true,
      observe: 'events'
    });
  }







  
  getReplyOnlyById(replyId: number): Observable<Reply>  {
    return this.http.get<Reply>(`${this.URL}/reply/${replyId}`);
  }
}
