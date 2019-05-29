import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterGuard } from './guard/router.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { BillingComponent } from './components/billing/billing.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', canActivate: [RouterGuard], component: HomeComponent },
  { path: 'billing', canActivate: [RouterGuard], component: BillingComponent },
  { path: 'inventory', canActivate: [RouterGuard], component: InventoryComponent },
  { path: 'search', canActivate: [RouterGuard], component: SearchComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
