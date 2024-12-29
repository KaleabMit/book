// reviews-rates.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews-rates',
  templateUrl: './reviews-rates.component.html',
  styleUrls: ['./reviews-rates.component.css']
})
export class ReviewsRatesComponent implements OnInit, OnDestroy {
  stats = [
    { value: 2500, displayValue: 0, label: 'Listings for sale' },
    { value: 1350, displayValue: 0, label: 'Listings for rent' },
    { value: 900, displayValue: 0, label: 'Property sold' },
    { value: 15, displayValue: 0, label: 'Active partners' }
  ];

  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.stats.forEach(stt => {
        if (stt.displayValue < stt.value) {
          stt.displayValue += Math.ceil(stt.value / 100); // Adjust the increment value as needed
          if (stt.displayValue > stt.value) {
            stt.displayValue = stt.value;
          }
        }
      });
    }, 25); // Adjust the interval time as needed
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}