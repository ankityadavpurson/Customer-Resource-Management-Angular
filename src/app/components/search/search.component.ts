import { Component, OnInit } from '@angular/core';

export interface CustomerDetails {
  customerName: string;
  billId: string;
  dateOfPurchase: string;
  mobileNo: number;
  emailId: string;
}

const CUSTOMER_DATA: CustomerDetails[] = [
  { customerName: 'Deeapk', billId: 'B001', dateOfPurchase: '12/05/2019', emailId: 'deepak@gmial.com', mobileNo: 9867564320 },
  { customerName: 'Ankit', billId: 'B002', dateOfPurchase: '14/05/2019', emailId: 'ankit@gmial.com', mobileNo: 8975436778 },
  { customerName: 'Abhishek', billId: 'B003', dateOfPurchase: '11/05/2019', emailId: 'abhishek@gmial.com', mobileNo: 9089765435 },
  { customerName: 'Dheeraj', billId: 'B004', dateOfPurchase: '16/05/2019', emailId: 'dhiraj@gmial.com', mobileNo: 9712309875 },
  { customerName: 'Piyush', billId: 'B005', dateOfPurchase: '13/05/2019', emailId: 'piyush@gmial.com', mobileNo: 9086342367 },
  { customerName: 'Shubhanshu', billId: 'B006', dateOfPurchase: '10/05/2019', emailId: 'shubhanshu@gmial.com', mobileNo: 9045327865 },
];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  searchString: string;
  displayedColumns: string[] = ['customerName', 'billId', 'dateOfPurchase', 'mobileNo', 'emailId', 'button'];
  dataSource = CUSTOMER_DATA;

  ngOnInit() { }

  view(id) {
    console.log(id);
  }

  search() {
    console.log(this.searchString);

    CUSTOMER_DATA.map(() => {
      
    });

    this.dataSource = CUSTOMER_DATA;
  }

}
