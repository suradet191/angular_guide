import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../services/rest.service';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  constructor(private restService: RestService) {

  }
  // ที่มี async คือไม่อยากรอคอย จึงต้องให้หน้าจอแสดงก่อน ถ้าเสร็จแล้วค่อยมาแสดงทีหลังได้
  transform(name: string): any {
    return new Observable<string | ArrayBuffer>((observer) => {
      // This is a tiny blank image
      // รูปเริ่มเต้น
      observer.next('assets/images/cmdev_logo.png');

      this.restService.getProductImage(name).subscribe(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          observer.next(reader.result);
        };
      });
      return { unsubscribe() { } };
    });
  }

}
