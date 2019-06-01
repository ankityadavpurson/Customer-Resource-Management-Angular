import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ELEMENT_DATA,INVENTORY_DATA } from '../../../assets/constant';
import { CUSTOMERDATA} from '../../../assets/constant';
export interface billingdetails {
  itemid: string;
  itemname: string;
  price: number;
  quantity: number;
  totalprice:number;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit, AfterContentChecked {

  displayedColumns: string[] = ['itemid', 'itemname', 'price', 'quantity','totalprice'];
  dataSource: billingdetails = [];
  array=[];
  total=0;
  billId: string;

  itemid:sreing;
  name:string;
  price:string;
  quantity = 1;
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
    let billing= {
      itemid: this.itemid,
      itemname: this.name,
      price: this.price,
      quantity: this.quantity,
      totalprice: this.totalprice
    }
    
    
    console.log(this.array);
    // ELEMENT_DATA.push(billingdetail);
    this.array.push(billing);
    this.dataSource = this.array;
  }
}
