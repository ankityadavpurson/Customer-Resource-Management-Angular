import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, ForgotDialogComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent, InventoryDialogComponent } from './components/inventory/inventory.component';
import { BillingComponent } from './components/billing/billing.component';
import { SearchComponent, ViewDialogComponent } from './components/search/search.component';
import { NavComponent } from './components/nav/nav.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForgotDialogComponent,
    InventoryComponent,
    BillingComponent,
    SearchComponent,
    NavComponent,
    ViewDialogComponent,
    InventoryDialogComponent,
    ConfirmComponent
  ],
  entryComponents: [
    ForgotDialogComponent,
    ViewDialogComponent,
    InventoryDialogComponent,
    ConfirmComponent
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
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
