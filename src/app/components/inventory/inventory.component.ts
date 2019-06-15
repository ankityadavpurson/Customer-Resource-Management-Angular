import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { INVENTORY_DATA } from '../../../assets/constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { BasicService } from 'src/app/services/basic.service';
import { ItemIype } from 'src/app/models/models';

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
    private rest: RestService,
    private service: BasicService
  ) { }

  Id: any;
  inventoryId: string;
  inventoryForm: FormGroup;
  keys = ['0'];
  itemIype = ItemIype;
  defaultType = 'Select Type ...';

  ngOnInit() {

    this.inventoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      discount: [0],
      type: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });

    this.keys = [...Object.keys(this.itemIype).filter(Number)];

    this.inventoryId = this.data.id;


    if (this.inventoryId) {
      console.log(this.inventoryId);
      // for (const inventory of INVENTORY_DATA) {
      //   if (inventory.inventoryId === this.inventoryId) {
      //     const { name, quantity, price, discount, type, expiryDate } = inventory;
      //     this.inventoryForm.patchValue({
      //       name: this.inventoryId ? name : '',
      //       quantity: this.inventoryId ? quantity : '',
      //       price: this.inventoryId ? price : '',
      //       discount: this.inventoryId ? discount : '',
      //       type: this.inventoryId ? type : '',
      //       expiryDate: this.inventoryId ? expiryDate : '',
      //     });
      //     this.defaultType = type;
      //   }
      // }

      this.rest.get('inventory/item?id=' + this.inventoryId, (resp) => {
        const { name, quantity, price, discount, type, expiryDate, _id } = resp.data;
        this.Id = _id;
        this.inventoryForm.patchValue({
          name: this.inventoryId ? name : '',
          quantity: this.inventoryId ? quantity : '',
          price: this.inventoryId ? price : '',
          discount: this.inventoryId ? discount : '',
          type: this.inventoryId ? type : '',
          expiryDate: this.inventoryId ? expiryDate : '',
        });
        this.defaultType = type;
      });
    }

  }

  itemFunction() {
    if (this.inventoryId) {
      // Editing Item
      // INVENTORY_DATA.forEach(inventory => {
      //   if (inventory.inventoryId === this.inventoryId) {
      //     const { value } = this.inventoryForm;
      //     inventory.name = value.name;
      //     inventory.quantity = value.quantity;
      //     inventory.price = value.price;
      //     inventory.discount = value.discount;
      //     inventory.type = value.type;
      //     inventory.expiryDate = value.expiryDate;
      //   }
      // });

      // this.service.tosterOpen('Item Updated', '', 2000);
      // this.dialogRef.close(INVENTORY_DATA);

      this.inventoryForm.value._id = this.Id;
      this.rest.post('inventory/update', this.inventoryForm.value,
        resp => {
          this.service.tosterOpen(resp.message, '', 1000);
          if (resp.responseCode === 200) { this.dialogRef.close(); }
        });

    } else {
      // Adding item
      const { value } = this.inventoryForm;
      const item = {
        inventoryId: '000',
        name: value.name,
        quantity: value.quantity,
        price: value.price,
        type: value.type,
        expiryDate: value.expiryDate,
        discount: value.discount,
      };

      // this.snackBar.open('Item Added', '', { duration: 2000 });
      // INVENTORY_DATA.push(item);
      // this.dialogRef.close(INVENTORY_DATA);

      this.rest.post('inventory/add', item,
        resp => {
          this.service.tosterOpen(resp.message, '', 1000);
          if (resp.responseCode === 201) { this.dialogRef.close(); }
        });
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
export class InventoryComponent implements OnInit, AfterViewInit {
  INVENTORIES: any[];

  constructor(
    public dialog: MatDialog,
    private rest: RestService,
    private service: BasicService
  ) { }

  displayedColumns: string[] = ['inventoryId', 'name', 'quantity', 'price', 'type', 'expiryDate', 'edit'];
  inventoryData = [];
  searchString: string;

  ngOnInit() { }

  ngAfterViewInit() {
    this.getAllItems();
  }

  getAllItems() {
    // this.inventoryData = INVENTORY_DATA;

    // this.service.tosterOpen('Loadding Inventory ...');
    this.rest.get('inventory/item', resp => {
      this.inventoryData = resp.data;
      this.inventoryData.reverse();
      this.INVENTORIES = this.inventoryData;
      // this.service.tosterDismiss();
    });
  }

  search() {
    const array = [];
    const searchString = (this.searchString || '').toLowerCase();

    // for (const inventory of INVENTORY_DATA) {
    for (const inventory of this.INVENTORIES) {
      // Searching fields
      const id = inventory.inventoryId.toLowerCase().match(searchString);
      const name = inventory.name.toLowerCase().match(searchString);
      const type = inventory.type.toLowerCase().match(searchString);

      if (id || name || type) { array.push(inventory); }
      this.inventoryData = array;
    }
  }

  editInventory(id: string) {
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      width: '80%', data: { id }
    });

    dialogRef.afterClosed().subscribe(res => this.getAllItems());
  }

  addNewItem() {
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      width: '80%', data: { id: null }
    });

    dialogRef.afterClosed().subscribe(res => {
      // this.inventoryData = [...res];
      this.getAllItems();
    });
  }

  deleteInventory(id: string) {
    // this.inventoryData = this.inventoryData.filter(item => {
    //   return id !== item.id;
    // });

    this.rest.post('inventory/remove/' + id, {}, resp => {
      this.service.tosterOpen(resp.message, '', 1000);
      this.getAllItems()
    });
  }

}
