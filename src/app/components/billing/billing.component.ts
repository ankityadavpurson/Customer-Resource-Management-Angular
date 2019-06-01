import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { INVENTORY_DATA } from '../../../assets/constant';

export interface BillingDetails {
  itemid?: string;
  name?: string;
  price?: number;
  quantity?: number;
  totalprice?: number;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {

  displayedColumns: string[] = ['itemid', 'name', 'price', 'quantity', 'totalprice'];
  dataSource: BillingDetails[] = [];
  billId: string;
  total = 0;

  itemid: string;
  name: string;
  price: number;
  quantity: number;
  totalprice: number;

  added = false;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      console.log(state.billId);
      this.billId = state.billId;
    }
  }

  setItem() {

    this.name = undefined;
    this.price = undefined;
    this.totalprice = undefined;

    for (const item of INVENTORY_DATA) {
      if (this.itemid.toLowerCase() === item.id.toLowerCase()) {
        const { name, price } = item;
        this.name = name;
        this.price = price;
      }
    }
    this.quantity = this.price ? 1 : undefined;
    this.totalprice = parseFloat((this.quantity * this.price).toFixed(2));
  }

  setPrice() {
    this.totalprice = parseFloat((this.quantity * this.price).toFixed(2));
  }

  addItemtolist() {
    const bill = {
      itemid: this.itemid,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      totalprice: this.totalprice
    };

    const array = this.dataSource;
    let add = true;

    this.dataSource.forEach(element => {
      if (element.itemid === bill.itemid) {
        add = false;
        element.quantity += this.quantity;
        element.totalprice += this.totalprice;
      }
    });

    this.total += parseFloat((this.totalprice).toFixed(2));

    if (add) { array.push(bill); }
    this.dataSource = [...array];

    this.added = true;

  }
}
