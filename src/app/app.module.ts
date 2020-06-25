import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StockHomeComponent } from './components/stocks/stock-home/stock-home.component';
import { StockCreateComponent } from './components/stocks/stock-create/stock-create.component';
import { StockEditComponent } from './components/stocks/stock-edit/stock-edit.component';
import { ShopHomeComponent } from './components/shops/shop-home/shop-home.component';
import { ShopPaymentComponent } from './components/shops/shop-payment/shop-payment.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ImagePipe } from './pipes/image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StockHomeComponent,
    StockCreateComponent,
    StockEditComponent,
    ShopHomeComponent,
    ShopPaymentComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
