import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { productViewModel } from 'src/app/models/product.ViewModel';
import { debounceTime } from 'rxjs/operators'; // (A)
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.scss']
})
export class StockHomeComponent implements OnInit {
  viewModel = new Array<productViewModel>();
  dataProduct = new Array<Product>();
  soldout: number = 0;
  textSearchChange = new Subject<string>();
  constructor(private resService: RestService,private router:Router) { }

  ngOnInit() {
    this.feedData();
    this.textSearchChange.pipe(debounceTime(1000)).subscribe(event => this.onSearch(event))
  }
  feedData() {
    this.resService.getProducts().subscribe(
      data => {
        this.dataProduct = data.result;
      }, err => {

      });
    this.resService.getSoldOut().subscribe(
      data => {
        this.soldout = data.out_of_stock_product;
      }, err => {

      }
    )
  }
  onSearch(keyword: string) {
    if (keyword === '') {
      this.feedData()
    } else {
      this.resService.searchProduct(keyword).subscribe(
        data => {
          this.dataProduct = data.result
        },
        err => {

        }
      )
    }
  }
  onEdit(id:number){
    this.router.navigate(['/stock/' + id]);
  }

  onDelete(id:number){
    this.resService.deleteProduct(id).subscribe
    (data => {
      alert(data.message);
      this.feedData();
    },
    err => {
      alert(err.message);
    })
  }
}
