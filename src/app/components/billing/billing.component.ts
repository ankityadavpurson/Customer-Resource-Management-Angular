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
  quantity: number;
  totalprice:number;

  constructor(private router: Router) {
  const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      console.log(state.billId);
      this.billId = state.billId;
    }   
  }

  ngAfterContentChecked(): void{}

  ngOnInit() { 
    for (const i of ELEMENT_DATA) {
      this.total+=i.totalprice;
        console.log(this.total);        
    }
  }

  setItem(){
    console.log(this.itemid);
    
    for (const item of INVENTORY_DATA) {

    if(this.itemid.toLowerCase() === item.id.toLowerCase())
      console.log(item); 
      const { name, price } = item;       
      this.name = name;
      this.price = price;
    }
  }

  setPrice(){    
    this.totalprice =  this.quantity * this.price;
  }

  addItemtolist(){

    let bill = {
      itemid:'weqwe',
      name:'qweqw',
      price:654,
      quantity:65,
      totalprice:654
    };

    const array = this.dataSource;
    array.push(bill);

    this.dataSource = [...array];
   console.log(this.dataSource);
   
  }
}
