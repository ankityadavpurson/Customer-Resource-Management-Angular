import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { INVENTORY_DATA, CUSTOMERDATA } from '../../../assets/constant';
import { BillingDetails, UserData, Bill } from 'src/app/models/models';
import { RestService } from 'src/app/services/rest.service';

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
    private router: Router,
    private rest: RestService
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
        type: customer.customerType === 'Guest' ? 'guest' : 'primary',
        email: customer.email,
      });

      this.added = true;
      this.total = bill.total;
      this.dataSource = [...bill.itemsPurchase];
    }
  }

  findUser() {
    const { mobileNo } = this.billForm.value;
    this.rest.get('billing/customer?mobileNo=' + (mobileNo || 0),
      resp => {
        const { data } = resp;
        this.billForm.patchValue({
          name: data.name,
          type: data.customerType === 'Guest' ? 'guest' : 'primary',
          email: data.email,
        });
      });

  }

  setItem(id = this.itemid) {

    this.itemid = id;
    this.name = undefined;
    this.price = undefined;
    this.totalprice = undefined;

    this.rest.get('inventory/item?id=' + (this.itemid || 0),
      resp => {
        const { name, price } = resp.data;
        this.name = name;
        this.price = price;

        this.quantity = this.price ? 1 : undefined;
        this.totalprice = this.quantity * this.price;
      });
  }

  setPrice() {
    this.totalprice = this.quantity * this.price;
  }

  addItemtolist() {
    this.added = true;
    if (this.billForm.valid) {
      const bill = {
        itemsPurchaseId: this.itemid,
        name: this.name,
        price: this.price,
        quantity: this.quantity,
        totalprice: this.totalprice,
        discount: 0
      };

      const array = this.dataSource;
      let add = true;

      this.dataSource.forEach(element => {
        if (element.itemsPurchaseId === bill.itemsPurchaseId) {
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
      return element.itemsPurchaseId !== item.itemsPurchaseId;
    });
    this.total = 0;
    this.dataSource.forEach(item => this.total += item.totalprice);
    if (this.dataSource.length === 0) { this.added = false; }
  }

  generateBill() {
    const user: UserData = this.billForm.value;
    const itemsPurchase: BillingDetails[] = this.dataSource;

    const bill: Bill = {
      billId: 100,
      user,
      itemsPurchase,
      discount: 0,
      grandTotal: this.total,
      dateOfPurchase: new Date()
    };

    this.rest.post('billing/addBill', bill,
      resp => {
        bill.billId = resp.data.billId;
        this.generatedBill = bill;
      });
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

  nextBill() {
    this.generatedBill = undefined;
    this.itemid = undefined;
    this.name = undefined;
    this.price = undefined;
    this.totalprice = undefined;
    this.dataSource = [];
    this.added = false;
    this.billForm.reset();
  }

}
