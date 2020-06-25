import { Component, OnInit } from '@angular/core';
import { productViewModel } from 'src/app/models/product.ViewModel';
import { buffer } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent implements OnInit {
  productViewModel = new productViewModel();
  imageSrc: ArrayBuffer | string = null;
  constructor(private restService: RestService, private router: Router, private location : Location ) { }

  ngOnInit() {
  }

  onSubmit() {
     this.restService.addProduct(this.productViewModel)
       .subscribe(data => {
         alert(data.message)
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
