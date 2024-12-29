import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsRatesComponent } from './reviews-rates.component';

describe('ReviewsRatesComponent', () => {
  let component: ReviewsRatesComponent;
  let fixture: ComponentFixture<ReviewsRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
