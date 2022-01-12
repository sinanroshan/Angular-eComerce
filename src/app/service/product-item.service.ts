import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  private orderUrlhost="http://192.168.1.5:9090/auth/";
  private orderUrllocal = "http://http://localhost:9090/auth";

  private productApihost="http://192.168.1.5:9090/api/product/";
  private ProductApilocal = "http://localhost:9090/api/product/";
  
  public CartItem :any=[]
  public productList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
    const ls = this.getCartData();
    if(ls) this.productList.next(ls);
   }
  getProductitem(Product: any){
    const ls = this.getCartData();
    let exist:any;
    if(ls)
      exist = ls.find((item)=>{
        return item.productId === Product.productId;
      });
    if(exist){
      exist.Quantity++;
      exist.Total = exist.Quantity * exist.price;
      this.setCartData(ls);
    }else{
      if(ls){
        const newData = [...ls,Product];
        this.setCartData(newData);
        this.productList.next(this.getCartData());
      }else{
        this.CartItem.push(Product);
        this.productList.next(this.CartItem);
        this.setCartData(this.CartItem);
        this.productList.next(this.CartItem);
       // console.log(this.CartItem);
          }
    }
  } 
updateQtyPlus(itm){
  const ls = this.getCartData();
  let exist:any;
    if(ls)
      exist = ls.find((item)=>{
        return item.productId === itm.productId;
      });
      exist.Quantity++;
      exist.Total = exist.Quantity * exist.price;
      this.setCartData(ls);
      this.productList.next(this.getCartData());
}
updateQtyMinus(itm){
  const ls = this.getCartData();
  let exist:any;
    if(ls)
      exist = ls.find((item)=>{
        return item.productId === itm.productId;
      });
      exist.Quantity--;
      exist.Total = exist.Quantity * exist.price;
      this.setCartData(ls);
      this.productList.next(this.getCartData());
}
  getCartItem(){
    return this.productList.asObservable();
  }
  getCartData(){
    return JSON.parse(localStorage.getItem('cart'));
  }
  ViewProduct(pname:any):Observable<Product[]>{
    return this.http.get<Product[]>(this.productApihost+pname);
  }
  removeCartItem(pid: any){
      this.CartItem= JSON.parse(localStorage.getItem('cart'));
      for( let i=0; i<this.CartItem.length; i++){
        if(pid === this.CartItem[i].productId){
          this.CartItem.splice(i,1);
          this.setCartData(this.CartItem);
      }
      }
    this.productList.next(this.CartItem);
    this.setCartData(this.productList);
    return this.productList.asObservable();
  }
  setCartData(data:any){
    localStorage.setItem('cart',JSON.stringify(data));
  }
  
  
}
