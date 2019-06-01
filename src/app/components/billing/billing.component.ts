import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ELEMENT_DATA, INVENTORY_DATA } from '../../../assets/constant';
import { CUSTOMERDATA} from '../../../assets/constant';

export interface BillingDetails {
  itemid?: string;
  name?: string;
  price?: number;
  quantity?: number;
  totalprice?:number;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  displayedColumns: string[] = ['itemid', 'name', 'price', 'quantity','totalprice'];
  dataSource: BillingDetails[]=[];
  billId:string;
  total = 0;

  itemid: string;
  name: string;
  price: number;
  quantity = 1;;
  totalprice: number;

  constructor(private router: Router) {
  const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      console.log(state.billId);
      this.billId = state.billId;
    }   
  }

  ngAfterContentChecked(): void{}

  ngOnInit() { }

  setItem(){
    console.log(this.itemid);
    
    for (const item of INVENTORY_DATA) {

    if(this.itemid.toLowerCase() === item.id.toLowerCase())
      console.log(item); 
      const { name, price } = item;       
      this.name = name;
      this.price = price;
    }

    this.totalprice = parseFloat((this.quantity * this.price).toFixed(2));

  }

  setPrice(){    
    this.totalprice = parseFloat((this.quantity * this.price).toFixed(2));
  }

  addItemtolist(){

    let bill = {
      itemid: this.itemid,
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      totalprice: this.totalprice
    };

    this.total += parseFloat((bill.totalprice).toFixed(2));

    const array = this.dataSource;
    array.push(bill);
    this.dataSource = [...array];
   
  }
}
