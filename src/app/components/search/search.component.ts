import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { RestService } from 'src/app/services/rest.service';
import { BasicService } from 'src/app/services/basic.service';

interface MB {
  mobileNo: number;
  customerData: any;
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
    private router: Router,
    private service: BasicService
  ) {
    this.service.tosterDismiss();
  }

  displayedColumns: string[] = ['id', 'dateOfPurchase', 'discount', 'items', 'total'];
  CUSTOMERDATA: any;
  billSource: any;

  ngOnInit() {
    this.CUSTOMERDATA = this.data.customerData;
    this.billSource = this.data.customerData.bills;
  }

  selectRow(row) {
    // this.service.tosterOpen('Loading ...');
    // this.CUSTOMERDATA.bills = [];
    // this.router.navigate(['billing'], {
    //   state: { bill: row, customer: this.CUSTOMERDATA }
    // });
    // this.dialogRef.close();
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
export class SearchComponent {

  searchString: string;
  displayedColumns: string[] = ['billId', 'name', 'dateOfPurchase', 'mobileNo', 'email'];
  dataSource = [];
  allBills = [];
  loading = true;

  constructor(
    public dialog: MatDialog,
    private rest: RestService,
    private service: BasicService
  ) {
    this.loadAllBills();
  }

  loadAllBills() {
    this.service.tosterOpen('Loading bills ...');
    this.rest.get('billing/allBills',
      resp => {
        this.dataSource = resp.data;
        this.allBills = resp.data;
        this.dataSource.reverse();
        this.loading = false;
        this.service.tosterDismiss();
      });
  }

  search() {
    const array = [];
    const searchString = this.searchString.toLowerCase();

    for (const customer of this.allBills) {
      // Searching fields
      const name = customer.name.toLowerCase().match(searchString);
      const billId = customer.billId.toLowerCase().match(searchString);
      const mobileNo = customer.mobileNo.toString().match(searchString);
      if (name || billId || mobileNo) { array.push(customer); }
      this.dataSource = array;
    }
  }

  view(row: { mobileNo: string; }) {
    this.service.tosterOpen('Loading details ...');
    this.rest.get('billing/customer?mobileNo=' + row.mobileNo,
      resp => {
        this.dialog.open(ViewDialogComponent, {
          width: '75%',
          data: { mobileNo: row.mobileNo, customerData: resp.data }
        });
      });
  }
}
