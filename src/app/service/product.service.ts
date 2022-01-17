import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
ip="http://192.168.1.3:9090"
localhost="http://localhost:9090"
  private ProductApilocal = this.ip+"/api/";
  private baseURL = this.ip+"/api/products/";
  
  constructor(private http: HttpClient) { }
  
getCompanyData(){
 return this.http.get<Company>(this.ProductApilocal+'/company',{responseType:'json'})
}
getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}`);
  }
addProduct(formData: FormData): Observable <any>{
    return this.http.post(this.ProductApilocal+`save/product`, formData);
 }
getCatogeryList(SuperCategory: String) :Observable<Product[]>{
    return this.http.get<Product[]>(this.ProductApilocal+`/category/`+SuperCategory);
 }
 getSuperCategory() :Observable<Product[]>{
  return this.http.get<Product[]>(this.ProductApilocal+`super_category`);
} 
getAllsubCategory():Observable<any>{
  return this.http.get(this.ProductApilocal+'getCatList');
}
 getProductByCategory(sCategory: string): Observable<Product[]> {
  return this.http.get<Product[]>(this.ProductApilocal+`products/`+sCategory);
}
serchProducts(search:string):Observable<Product[]>{
  return this.http.get<Product[]>(this.ProductApilocal+'search/'+search);
}
serchKeyword(search:string):Observable<Product[]>{
  return this.http.get<Product[]>(this.ProductApilocal+`keyword/`+search);}

}
