import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { CUSTOMER_DATA, CUSTOMERDATA } from '../../../assets/constant';

export interface MB {
  mobileNo: number;
}

@Component({
  selector: 'app-view-dialog',
  templateUrl: 'view.component.html',
  styleUrls: ['./search.component.css']
})
export class ViewDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MB,
    private router: Router
  ) { }

  displayedColumns: string[] = ['id', 'dateOfPurchase', 'discount', 'items', 'total'];
  CUSTOMERDATA;
  billSource;

  ngOnInit() {
    for (const customer of CUSTOMERDATA) {
      if (customer.mobileNo === this.data.mobileNo) {
        this.CUSTOMERDATA = customer;
        this.billSource = customer.bill;
      }
    }
  }

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
    this.dialog.open(ViewDialogComponent, {
      width: '75%',
      data: { mobileNo: row.mobileNo }
    });
  }

}
