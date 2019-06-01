import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  billId: string;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      console.log(state.billId);
      this.billId = state.billId;
    }
  }

  ngOnInit() { }

}
