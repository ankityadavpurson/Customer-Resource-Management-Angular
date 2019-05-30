import { Component, OnInit } from '@angular/core';

import { INVENTORY_DATA } from '../../../assets/constant';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor() { }

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
  }

  // view(row) {
  //   console.log(row);
  // }

}
