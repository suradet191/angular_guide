import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productViewModel } from '../models/product.ViewModel';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // localhost:5001
  private hostURL = environment.baseAPIURL;
  private apiURL = `${this.hostURL}`;
  // -----------------------------------------------------
  // https://localhost:5001/api/user/login
  private loginURL = `${this.apiURL}/api/user/login`;
  private registerURL = `${this.apiURL}/api/user/register`;
  private productURL = `${this.apiURL}/api/product`;
  private productImageURL = `${this.apiURL}/api/product/images`;
  private outOfStockURL = `${this.productURL}/count/out_of_stock`;
  private transactionURL = `${this.apiURL}/transaction`;

  constructor(private http: HttpClient) { }

  onLogin(models: any): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(this.loginURL,
      models,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  onRegister(models: any): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(this.registerURL,
      models,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getProducts(): Observable<ResponseProducts> {
    return this.http.get<ResponseProducts>(this.productURL);
  }

  getProduct(id: number): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`${this.productURL}/${id}`);
  }

  getSoldOut(): Observable<ResponseOutOfStock> {
    return this.http.get<ResponseOutOfStock>(this.outOfStockURL);
  }
  // localhost:5001/api/product/search/name?keyword='asdasd'
  searchProduct(val: string): Observable<ResponseProducts> {
    // this.http.get(this.productURL + '/search/name?keyword='+val)
    return this.http.get<ResponseProducts>(`${this.productURL}/search/name?keyword=${val}`)
  }

  // ใช้สำหรับทำ pipe Image
  // Blob คือ Binary Byte Array ตรงๆ ไม่มี overhead แต่อย่างใด ซึ่งทำให้ การจัดการ Blob นั้นเร็วกว่า และประหยัดกว่า
  getProductImage(name: string): Observable<Blob> {
    return this.http.get(`${this.productImageURL}/${name}`, { responseType: 'blob' });
  }

  addProduct(model: productViewModel): Observable<ResponseProduct> {
    return this.http.post<ResponseProduct>(this.productURL, this.makeFormData(model));
  }

  editProduct(model: productViewModel, id: number): Observable<ResponseProduct> {
    // localhost:5001/api/product/5
    return this.http.put<ResponseProduct>(`${this.productURL}/${id}`, this.makeFormData(model));
  }
  deleteProduct(id: number): Observable<ResponseProduct> {
    return this.http.delete<ResponseProduct>(`${this.productURL}/${id}`);
  }
  // ทำ formData
  makeFormData(product: productViewModel): FormData {
    debugger;
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    formData.append('upload_file', product.image);
    return formData;
  }

}
