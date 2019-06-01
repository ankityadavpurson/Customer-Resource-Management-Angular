import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Material imports
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, ForgetDialogComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent, InventoryDialogComponent } from './components/inventory/inventory.component';
import { BillingComponent } from './components/billing/billing.component';
import { SearchComponent, ViewDialogComponent } from './components/search/search.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForgetDialogComponent,
    InventoryComponent,
    BillingComponent,
    SearchComponent,
    NavComponent,
    ViewDialogComponent,
    InventoryDialogComponent
  ],
  entryComponents: [
    ForgetDialogComponent,
    ViewDialogComponent,
    InventoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
