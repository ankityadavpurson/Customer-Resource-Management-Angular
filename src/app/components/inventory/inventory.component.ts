import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { INVENTORY_DATA } from '../../../assets/constant';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { }

  inventoryId: string;
  inventoryForm: FormGroup;

  ngOnInit() {

    this.inventoryId = this.data.id;

    const { name, quantity, price, type, expiryDate } = INVENTORY_DATA[2];

    this.inventoryForm = this.formBuilder.group({
      name: [this.inventoryId ? name : ''],
      quantity: [this.inventoryId ? quantity : ''],
      price: [this.inventoryId ? price : ''],
      type: [this.inventoryId ? type : ''],
      expiryDate: this.inventoryId ? expiryDate : ['']
    });

  }

  itemFunction() {
    console.log(this.inventoryId ? 'Update Item' : 'Add Item');
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

  constructor(
    public dialog: MatDialog
  ) { }

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
    console.log(id);
    this.dialog.open(InventoryDialogComponent, {
      width: '80%', data: { id }
    });
  }

  addNewItem() {
    this.dialog.open(InventoryDialogComponent, {
      width: '80%', data: { id: null }
    });
  }

}
