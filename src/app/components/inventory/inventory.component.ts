import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { INVENTORY_DATA } from '../../../assets/constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Inventory { id: string; }

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: 'inventory-dialog.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  inventoryId: string;
  inventoryForm: FormGroup;

  ngOnInit() {
    this.inventoryId = this.data.id;

    this.inventoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      type: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });

    for (const inventory of INVENTORY_DATA) {
      if (inventory.id === this.inventoryId) {
        const { name, quantity, price, type, expiryDate } = inventory;
        this.inventoryForm.patchValue({
          name: this.inventoryId ? name : '',
          quantity: this.inventoryId ? quantity : '',
          price: this.inventoryId ? price : '',
          type: this.inventoryId ? type : '',
          expiryDate: this.inventoryId ? expiryDate : '',
        });
      }
    }
  }

  itemFunction() {
    if (this.inventoryId) {

      INVENTORY_DATA.forEach(inventory => {
        if (inventory.id === this.inventoryId) {
          const { value } = this.inventoryForm;
          inventory.name = value.name;
          inventory.quantity = value.quantity;
          inventory.price = value.price;
          inventory.type = value.type;
          inventory.expiryDate = value.expiryDate;
        }
      });

      this.snackBar.open('Item Updated', '', { duration: 2000 });
      this.dialogRef.close(INVENTORY_DATA);

    } else {
      const { value } = this.inventoryForm;
      const item = {
        id: 'I007',
        name: value.name,
        quantity: value.quantity,
        price: value.price,
        type: value.type,
        expiryDate: value.expiryDate,
        discount: 0,
      };

      this.snackBar.open('Item Added', '', { duration: 2000 });
      INVENTORY_DATA.push(item);
      this.dialogRef.close(INVENTORY_DATA);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'type', 'expiryDate', 'edit'];
  inventoryData = INVENTORY_DATA;
  searchString: string;

  ngOnInit() { }

  search() {
    const array = [];
    const searchString = this.searchString.toLowerCase();

    for (const inventory of INVENTORY_DATA) {
      // Searching fields
      const id = inventory.id.toLowerCase().match(searchString);
      const name = inventory.name.toLowerCase().match(searchString);
      const type = inventory.type.toLowerCase().match(searchString);

      if (id || name || type) { array.push(inventory); }
      this.inventoryData = array;
    }
  }

  editInventory(id) {
    this.dialog.open(InventoryDialogComponent, {
      width: '80%', data: { id }
    });
  }

  addNewItem() {
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      width: '80%', data: { id: null }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.inventoryData = [...res];
    });
  }

  deleteInventory(id) {
    this.inventoryData = this.inventoryData.filter(item => {
      return id !== item.id;
    });
  }

}
