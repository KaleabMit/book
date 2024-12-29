import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymenttype',
  templateUrl: './paymenttype.component.html',
  styleUrls: ['./paymenttype.component.css']
})
export class PaymenttypeComponent {

  constructor(private router: Router) {}

  navigateToPayment(): void {
    this.router.navigate(['/payment']);
  }
}
