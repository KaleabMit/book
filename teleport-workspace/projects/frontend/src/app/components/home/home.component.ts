import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'projects/models/post.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { catchError, map, Observable, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts$: Observable<Post[]> = new Observable<Post[]>();
  filteredPosts: Post[] = [];
  subs: Subscription[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      const scrollElement = params['scroll'] || '';
      this.subs.push(this.apiService.getAllPosts().pipe(
        catchError(err => throwError(err))
      ).subscribe(posts => {
        this.filteredPosts = this.filterPosts(posts, this.searchTerm);
        if (scrollElement) {
          this.scrollToElement(scrollElement);
        }
      }));
    });
  }

  filterPosts(posts: Post[], searchTerm: string): Post[] {
    if (!searchTerm) {
      return posts;
    }
    searchTerm = searchTerm.toLowerCase();
    return posts.filter(post =>
      post.category.title.toLowerCase().includes(searchTerm) ||
      post.address.toLowerCase().includes(searchTerm)
    );
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}


