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
  total = 0;
  itemid: string;
  name: string;
  price: number;
  quantity: number;
  totalprice: number;
  added = false;
  billForm: FormGroup;
  state: any;
  generatedBill = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.state = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.billForm = this.formBuilder.group({
      mobileNo: ['', Validators.required],
      name: ['', Validators.required],
      type: [{ value: 'guest', disabled: true }],
      email: ['', Validators.required]
    });

    this.mapBill();
  }

  mapBill() {
    const state = this.state;
    if (state) {
      const { bill, customer } = state;
      this.billForm.patchValue({
        mobileNo: customer.mobileNo,
        name: customer.name,
        type: customer.primary ? 'primary' : 'guest',
        email: customer.email,
      });

      for (const item of bill.items) {
        this.itemid = item;
        this.setItem();
        this.addItemtolist();
      }
      this.itemid = undefined;
      this.name = undefined;
      this.price = undefined;
      this.totalprice = undefined;
    }
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
    this.totalprice = this.quantity * this.price;
  }

  setPrice() {
    this.totalprice = this.quantity * this.price;
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
        if (element.itemid.toLowerCase() === bill.itemid.toLowerCase()) {
          add = false;
          element.quantity += this.quantity;
          element.totalprice += this.totalprice;
        }
      });

      this.total += this.totalprice;

      if (add) { array.push(bill); }
      this.dataSource = [...array];
    }
  }

  deleteItem(element) {
    this.dataSource = this.dataSource.filter(item => {
      return element.itemid !== item.itemid;
    });
    this.total = 0;
    this.dataSource.forEach(item => this.total += item.totalprice);
  }

  generateBill() {
    const user: UserData = this.billForm.value;
    const billDetails: BillingDetails[] = this.dataSource;

    const bill: Bill = {
      billId: Math.floor((Math.random() * 10000) + 1000),
      user,
      billDetails,
      grandTotal: this.total
    };

    // console.log(JSON.stringify(bill));

    this.generatedBill = bill;

  }

  printBill() {
    let printContents: string;
    let popupWin: Window;
    printContents = document.getElementById('billGeneratedDiv').innerHTML;
    popupWin = window.open();
    popupWin.document.write(
      `<html>
          <head>
            <title>Bill</title>
            <style>
                body {
                  padding:20px;
                }
                .billData tr td {
                  text-align: center; padding: 10px;
                }

                table {
                  width:100%;
                  border:1px solid black;
                  padding:10px;
                }

                td, th {
                  border-bottom:1px solid black;
                }
            </style>
          </head>
          <body onload="window.print();window.close()">${printContents}</body>
        </html>`
    );
    popupWin.document.close();
  }

  cencelBill() {
    this.generatedBill = undefined;
  }

}
