import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { StockHomeComponent } from './components/stocks/stock-home/stock-home.component';
import { StockCreateComponent } from './components/stocks/stock-create/stock-create.component';
import { StockEditComponent } from './components/stocks/stock-edit/stock-edit.component';
import { ShopHomeComponent } from './components/shops/shop-home/shop-home.component';
import { ShopPaymentComponent } from './components/shops/shop-payment/shop-payment.component';


const routes: Routes = [
  { 'path': '', component: LoginComponent},
  { 'path': 'register', component: RegisterComponent },

  { 'path': 'stock', component: StockHomeComponent },
  { 'path': 'stock/create', component: StockCreateComponent },
  { 'path': 'stock/:id', component: StockEditComponent },

  { 'path': 'shop', component: ShopHomeComponent },
  { 'path': 'stock/payment', component: ShopPaymentComponent },
  //404 not found
  { 'path': '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
