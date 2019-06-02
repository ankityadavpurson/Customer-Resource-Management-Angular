import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { CUSTOMER_DATA, CUSTOMERDATA } from '../../../assets/constant';

@Component({
  selector: 'app-view-dialog',
  templateUrl: 'view.component.html',
  styleUrls: ['./search.component.css']
})
export class ViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    private router: Router
  ) { }

  displayedColumns: string[] = ['id', 'dateOfPurchase', 'discount', 'items', 'total'];
  CUSTOMERDATA = CUSTOMERDATA[0];
  billSource = CUSTOMERDATA[0].bill;

  selectRow(row) {
    this.router.navigate(['billing'], {
      state: { bill: row, customer: this.CUSTOMERDATA }
    });
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchString: string;

  displayedColumns: string[] = ['billId', 'customerName', 'dateOfPurchase', 'mobileNo', 'emailId'];
  dataSource = CUSTOMER_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  search() {
    const array = [];
    const searchString = this.searchString.toLowerCase();

    for (const customer of CUSTOMER_DATA) {
      // Searching fields
      const name = customer.customerName.toLowerCase().match(searchString);
      const billId = customer.billId.toLowerCase().match(searchString);
      const mobileNo = customer.mobileNo.toString().match(searchString);

      if (name || billId || mobileNo) { array.push(customer); }
      this.dataSource = array;
    }
  }

  view(row): void {
    this.dialog.open(ViewDialogComponent, { width: '75%' });
  }

}
