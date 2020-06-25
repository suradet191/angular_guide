import { Component, OnInit } from '@angular/core';
import { productViewModel } from 'src/app/models/product.ViewModel';
import { buffer } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {
  productViewModel: productViewModel;
  imageSrc: ArrayBuffer | string = null;
  idPrd: number;
  constructor(private activate: ActivatedRoute, private restService: RestService, private router: Router,private location : Location) { }

  ngOnInit() {
    this.feedData()
  }
  feedData() {
    this.activate.params.subscribe(data => { this.idPrd = data.id });
    this.restService.getProduct(this.idPrd).subscribe(
      data => {
        this.productViewModel = data.result as productViewModel;
      }, err => {

      });
  }
  onSubmit() {

    this.restService.editProduct(this.productViewModel, this.idPrd)
      .subscribe(data => {
        alert(data.message);
        this.router.navigate(['/stock']);
      }, err => {
        alert(err.message)
      });
  }
  onCancle() {
    this.location.back();
  }
  onUploadImage(event) {
    // จังหวะที่ส่ง event มาจะมี meta ส่งมาด้วย
    const metaImage = event.target.files[0];
    if (metaImage) {
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        // ส่ง path url ใหม่ให้แล้วจะรีเฟรส ให้เอง
        this.imageSrc = reader.result;
        // bind ชื่อ image ใหม่
        this.productViewModel.image = metaImage;
      };
    }
  }
}
