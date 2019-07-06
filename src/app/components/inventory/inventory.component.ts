import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { BasicService } from 'src/app/services/basic.service';
import { ItemIype } from 'src/app/models/models';
import { ConfirmComponent } from '../confirm/confirm.component';

export interface Inventory { id: string; }

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: 'inventory-dialog.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryDialogComponent implements OnInit {

  Id: any;
  inventoryId: string;
  inventoryForm: FormGroup;
  keys = ['0'];
  itemIype = ItemIype;
  defaultType = 'Select Type ...';

  constructor(
    public dialogRef: MatDialogRef<InventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory,
    private formBuilder: FormBuilder,
    private rest: RestService,
    private service: BasicService
  ) {
    if (data.id) {
      this.service.tosterOpen('loading item ...');
    }
  }

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

    if (this.inventoryId) { this.fillItemForm(); }

  }

  private fillItemForm() {
    this.inventoryForm.disable();
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
      this.inventoryForm.enable();
      this.service.tosterDismiss();
    });
  }

  itemFunction() {
    if (this.inventoryId) {
      // Updeting item
      this.inventoryForm.value._id = this.Id;

      this.service.tosterOpen('Updating Item ...');
      this.rest.post('inventory/update', this.inventoryForm.value,
        resp => {
          this.service.tosterOpen(resp.message, '', 2000);
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

      this.service.tosterOpen('Adding Item ...');
      this.rest.post('inventory/add', item,
        resp => {
          this.service.tosterOpen(resp.message, '', 2000);
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
export class InventoryComponent {

  INVENTORIES = [];
  displayedColumns: string[] = ['inventoryId', 'name', 'quantity', 'price', 'type', 'expiryDate', 'edit'];
  inventoryData = [];
  searchString: string;
  confirm: any;
  loading = true;

  constructor(
    public dialog: MatDialog,
    private rest: RestService,
    private service: BasicService
  ) {
    this.service.tosterOpen('loading items ...');
    this.getAllItems();
  }

  getAllItems() {
    this.rest.get('inventory/item', resp => {
      this.inventoryData = resp.data;
      this.inventoryData.reverse();
      this.INVENTORIES = this.inventoryData;
      this.loading = false;
      this.service.tosterDismiss();
    });
  }

  search() {
    const array = [];
    const searchString = (this.searchString || '').toLowerCase();

    for (const inventory of this.INVENTORIES) {
      // Searching fields
      const id = inventory.inventoryId.toLowerCase().match(searchString);
      const name = inventory.name.toLowerCase().match(searchString);
      const type = inventory.type.toLowerCase().match(searchString);

      if (id || name || type) { array.push(inventory); }
      searchString.length === 0
        ? this.inventoryData = this.INVENTORIES
        : this.inventoryData = array;
    }
  }

  resetSearchString() {
    this.searchString = '';
    this.inventoryData = this.INVENTORIES;
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
      this.getAllItems();
    });
  }

  deleteInventory(id: string) {

    const dialogRef = this.dialog.open(ConfirmComponent, { width: '35%' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.tosterOpen('Deleting Item ...');
        this.rest.post('inventory/remove/' + id, {}, resp => {
          this.service.tosterOpen(resp.message, '', 2000);
          this.getAllItems();
        });
      }
    });
  }
}
