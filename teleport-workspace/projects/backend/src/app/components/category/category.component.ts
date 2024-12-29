import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";
import { Category } from 'projects/models/category.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  subs: Subscription[] = [];

  constructor(private apiService: ApiService,
              private message: MessageService) {
  }

  ngOnInit(): void {

    this.subs.push(this.apiService.getAllCategories().subscribe(cats => this.categories = cats.filter(c => c.title !== 'Uncategorized')));
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

  create(cat: NgForm) {
    if (cat.invalid) {
      return;
    }
    const {title, photo} = cat.value;

    this.apiService.createCategory(title, photo).subscribe(res => {
      this.categories.push(res);
      cat.reset();
    })
  }

  update(ev: CellEventResponse) {
    this.subs.push(this.apiService.updateCategory(ev.data.id, ev.data.title, ev.data.photo).subscribe(res => {
      this.categories[ev.index].title = res.title;
      this.categories[ev.index].photo = res.photo;
      this.message.add({
        severity: 'success',
        detail: 'Category Updated',
        life: 1000,
        summary: 'Successful'
      })
    }));
  }

  remove(rowIndex: number, id: number) {
    this.subs.push(
      this.apiService.removeCategory(id).subscribe(res => {
        if (res.success) {
          this.message.add({
            severity: 'success',
            detail: 'Category Removed',
            life: 1000,
            summary: 'Successful'
          })
        }
        this.categories.splice(rowIndex, 1);
      })
    )
  }
}

interface CellEventResponse {
  data: { id: number, title: string, photo: string }
  field: string
  index: number
}
