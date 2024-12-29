import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'projects/models/category.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit,OnDestroy {
  cats:Category[]=[];
  sub$=new Subject();
  constructor(private apiService:ApiService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getAllCategories().pipe(
      takeUntil(this.sub$)
    ).subscribe(res=>{
      this.cats=res.filter(c=>c.title!=='Uncategorized')
      });
  }
  ngOnDestroy(): void {
    this.sub$.next(undefined);
    this.sub$.complete();
  }

  navigateAndScroll(elementId: string, categoryTitle: string): void {
    // First, navigate to the route
    this.router.navigate(['post/category', categoryTitle]).then(() => {
      // After navigation is complete, scroll to the element
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


}