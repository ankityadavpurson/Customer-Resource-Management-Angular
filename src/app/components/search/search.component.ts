import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface CustomerDetails {
  customerName: string;
  billId: string;
  dateOfPurchase: string;
  mobileNo: number;
  emailId: string;
}

const CUSTOMER_DATA: CustomerDetails[] = [
  { customerName: 'Deeapk', billId: 'B001', dateOfPurchase: '12/05/2019', emailId: 'deepak@gmial.com', mobileNo: 9867564320 },
  { customerName: 'Ankita', billId: 'B001', dateOfPurchase: '14/05/2019', emailId: 'ankit@gmial.com', mobileNo: 8975436778 },
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

  constructor(
    public dialog: MatDialog
  ) { }

  searchString: string;
  displayedColumns: string[] = ['customerName', 'billId', 'dateOfPurchase', 'mobileNo', 'emailId', 'button'];
  dataSource = CUSTOMER_DATA;

  ngOnInit() { }

  search() {

    let array =[];
    let searchString = this.searchString.toLowerCase( );

    for (let i = 0; i < CUSTOMER_DATA.length; i++) {

      let name=CUSTOMER_DATA[i].customerName.toLowerCase();
      let billId=CUSTOMER_DATA[i].billId.toLowerCase();

      if(name.match(searchString) || billId.match(searchString)){
        array.push(CUSTOMER_DATA[i]);
      }
      
      this.dataSource = array;
    }

  }

  view(id): void {
  {
    console.log(id);
    
    const dialogRef = this.dialog.open(ViewDialogComponent, {
        width: '50%',
        // data: { userId: this.userId }
      });
    }
  }

}



@Component({
  selector: 'app-view-dialog',
  templateUrl: 'view.component.html',
  styleUrls: ['./search.component.css']
})
export class ViewDialogComponent {

  CUSTOMERDATA={
    id:32132,
    name:'Piyush',
    bill:[
      {
        id:'B001',
        dateOfPurchase:'2019/05/29',
        discount:'50%',
        items:['I001','I002','I003'],
        total:100 
      },
      {
        id:'B002',
        dateOfPurchase:'2019/05/31',
        discount:'10%',
        items:['I001','I004','I003'],
        total:10 
      },
      {
        id:'B003',
        dateOfPurchase:'2019/05/30',
        discount:'0%',
        items:['I001','I006','I003'],
        total:99
      }

    ],
    mobileNo:9874563210,
    email:'Piyu@kota.com',
    address:'Room No.41,NMH Layout,Bhoomika Colony,Kirloskar,ChickBanavara',
    pincode:560090
    }

 
  constructor(public dialogRef: MatDialogRef<ViewDialogComponent>) { }

  cancel() {
    this.dialogRef.close();
  }

}
