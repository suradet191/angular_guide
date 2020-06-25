
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { productViewModel } from 'src/app/models/product.ViewModel';
import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss']
})
export class ShopHomeComponent implements OnInit {
  mProductOrder: productViewModel[] = [];
  mProductCart: productViewModel[] = [];
  mIsPaymentShow = false;
  mTotalPrice: number = 0;
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.feedData();
  }

  feedData() {
    this.restService.getProducts().subscribe(data => {
      this.mProductOrder = data.result as productViewModel[];
    });
  }
  // เมื่อมีการเลือกไอเท็มจะมี hilight สีให้
  isSelectedItem(item: productViewModel) {
    return this.mProductCart.indexOf(item) === -1 ? false : true;
  }
  onClickAddOrder(model: productViewModel) {

    const foundIndex = this.mProductCart.indexOf(model);

     if (foundIndex === -1) {
       model.qty = 1;
      this.mProductCart.unshift(model);
     }
     else {
       model.qty++;
    }
     this.countSumPrice();

  }
  countSumPrice() {
    this.mTotalPrice = 0;
    this.mProductCart.forEach(element => {
      this.mTotalPrice += element.price * element.qty;
    });
  }

  onClickRemoveOrder(item: productViewModel) {
    this.mProductCart.map(data => {
      if (item.productId === data.productId) {
        data.qty = null;
      }
    });

    this.mProductCart.splice(this.mProductCart.indexOf(item), 1);
    this.countSumPrice();
  }
}
