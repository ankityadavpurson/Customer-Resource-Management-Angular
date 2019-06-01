import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { INVENTORY_DATA, CUSTOMERDATA } from '../../../assets/constant';
import { BillingDetails, UserData, Bill } from 'src/app/models/models';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

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

  billForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      console.log(state.billId);
      this.billId = state.billId;
    }
  }

  ngOnInit() {
    this.billForm = this.formBuilder.group({
      mobileNo: ['', Validators.required],
      name: ['', Validators.required],
      type: [{ value: 'guest', disabled: true }],
      email: ['', Validators.required]
    });
  }

  findUser() {
    const { mobileNo } = this.billForm.value;
    for (const customer of CUSTOMERDATA) {
      if (customer.mobileNo === mobileNo) {
        this.billForm.patchValue({
          name: customer.name,
          type: customer.primary ? 'primary' : 'guest',
          email: customer.email,
        });
      }
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
    this.added = true;
    if (this.billForm.valid) {
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

      this.total += parseFloat((this.totalprice).toPrecision(2));

      if (add) { array.push(bill); }
      this.dataSource = [...array];
    }

  }

  generateBill() {
    const user: UserData = this.billForm.value;
    const billDetails: BillingDetails[] = this.dataSource;

    const bill: Bill = {
      billId: Math.random(),
      user,
      billDetails,
      grandTotal: this.total
    };

    console.log(JSON.stringify(bill));

  }

}
