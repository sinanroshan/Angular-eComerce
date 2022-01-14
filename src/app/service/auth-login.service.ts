import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  ip="http://192.168.1.4:9090"
  localhost="http://localhost:9090"

  private hostApi = this.ip+"/auth";
  constructor(private http: HttpClient) { }
  public User:any;
    chekUserName(encodedUname: string):Observable<any>{
      return this.http.get(this.hostApi+'/chek/'+ encodedUname);
    }
    Login(encodedKey:string):Observable<any>{
      return this.http.get(this.hostApi+'/AuthGuard/'+encodedKey,{responseType:'text'})
    }
     isLogedin():boolean{
    let tokenCheker="";
    tokenCheker=localStorage.getItem('Tl');
    if(tokenCheker==null){
      return false; }
    else{
      return true;
    }
  } 
  Auth_signout(){
    localStorage.removeItem('Tl');
  }
  getUser():Observable<any>{
    return this.http.get(this.hostApi+'/user/'+ localStorage.getItem('Tl'));
    //localStorage.setItem('user',this.User);
  }
  register(efname:string,esname:string,ephone:string,eemail:string,epass:string,):Observable<any>{
    return this.http.get(this.hostApi+'/SignUp/'+ efname +'/'+ esname +'/'+ ephone +'/'+ eemail +'/'+ epass,{responseType:'text'})
  }
  setAddress(token:string,fname:string,phone:string,Area:string,House_n:string,Pincode:string,Landmark:string,Town_city:string){
    return this.http.get(this.hostApi+'/setAdd/'+ token +'/'+ fname +'/'+ phone +'/'+ Area +'/'+ House_n +'/'+ Pincode +'/'+ Landmark +'/'+ Town_city,{responseType:'text'})
  }
  getAdd():Observable<any>{
    let token=localStorage.getItem('Tl');
    return this.http.get(this.hostApi+'/getAdd/'+token);
  }

  //oder list and save bill
  order(billAmount):Observable<any>{
    let cart=JSON.parse(localStorage.getItem('cart'));
    let pid=[];
    let pname=[];
    let pqty=[];
    let pcategory=[];
    let price=[];
    let mrp=[];
    let tprice=[];
    let qty=cart.length;
    let token=localStorage.getItem('Tl');
    let i=0;
    for(i=0; i<qty;i++){
      pid[i]=cart[i].productId;
      pname[i]=cart[i].pname;
      pqty[i]=cart[i].Quantity;
      pcategory[i]=cart[i].pcategory
      price[i]=cart[i].price;
      mrp[i]=cart[i].mrp;
      tprice[i]=cart[i].Total;
    }
   return this.http.get(this.hostApi+'/order/'+token+'/'+qty+'/'+billAmount+'/'+pid+'/'+pname+'/'+pqty+'/'+pcategory+'/'+price+'/'+mrp+'/'+tprice);
  
  }
  getOrder():Observable<any>{
    let token=localStorage.getItem('Tl');
        return this.http.get(this.hostApi+'/getOrder/'+token);
  }
  getOrderList(invNo):Observable<any>{
    return this.http.get(this.hostApi+'/OrderList/'+invNo);
  }
  billdata(invNo):Observable<any>{
    return this.http.get(this.hostApi+'/bill/'+invNo);
  }
  cancelThis(invNo, pid, status):Observable<any>{
    return this.http.get(this.hostApi+'/ItemStatus/'+invNo+'/'+pid+'/'+status);
  }
  cancelOrder(invNo, status):Observable<any>{
    return this.http.get(this.hostApi+'/OrderStatus/'+invNo+'/'+status);
  }
}
