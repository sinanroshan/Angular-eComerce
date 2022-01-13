import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productApihost="http://192.168.1.5:9090/api/";
  private ProductApilocal = "http://http://localhost:9090/api/";
  private baseURL = "http://192.168.1.5:9090//api/products/";
  
  constructor(private http: HttpClient) { }

getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}`);
  }
addProduct(formData: FormData): Observable <any>{
    return this.http.post(this.productApihost+`save/product`, formData);
 }
getCatogeryList(SuperCategory: String) :Observable<Product[]>{
    return this.http.get<Product[]>(this.productApihost+`/category/`+SuperCategory);
 }
 getSuperCategory() :Observable<Product[]>{
  return this.http.get<Product[]>(this.productApihost+`super_category`);
} 
getAllsubCategory():Observable<any>{
  return this.http.get(this.productApihost+'getCatList');
}
 getProductByCategory(sCategory: string): Observable<Product[]> {
  return this.http.get<Product[]>(this.productApihost+`products/`+sCategory);
}
serchProducts(search:string):Observable<Product[]>{
  return this.http.get<Product[]>(this.productApihost+'search/'+search);
}
serchKeyword(search:string):Observable<Product[]>{
  return this.http.get<Product[]>(this.productApihost+`keyword/`+search);}

}
