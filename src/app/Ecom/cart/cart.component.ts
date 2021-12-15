import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth-login.service';
import { ProductItemService } from 'src/app/service/product-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart : any= [];
  public TotalMrp =0;
  public TotalPrice = 0;
  public DiscountOnMrp =0;
  constructor(private productitemservice : ProductItemService,
     private auth:AuthLoginService,
     private router:Router,
     private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.Cart();
    this.getBil();
  }
Cart(){
  this.productitemservice. getCartItem().subscribe(res=>{
    this.cart = res});
  }
  removeItem(pid: any){
    window.location.reload();
    this.productitemservice.removeCartItem(pid);
    
  }
  QtyMinus(item){
    if(item.Quantity>1)
    {
      item.Quantity--;
      this.productitemservice.updateQtyMinus(item);
    }
    this.getBil();
  }
  QtyPlus(item){
    if(item.Quantity<10)
    {
      item.Quantity++
      this.productitemservice.updateQtyPlus(item);
    }
    this.getBil();
  }
  getBil(){
  this.TotalMRP();
  this.getTotalPrice();
  this.DiscountOnMrp=this.TotalMrp - this.TotalPrice;
  }
  TotalMRP(){
    this.TotalMrp=0;
    const ls = this.cart;
    ls.map((a:any)=>{
      this.TotalMrp += (a.Quantity) * (a.mrp);
    });
  }
  getTotalPrice(){
    this.TotalPrice=0;
    let i:number;
    for(i=0; i<this.cart.length; i++){
      this.TotalPrice = this.TotalPrice +((this.cart[i].Quantity) * (this.cart[i].price));
    }
  }
  cheout(){
    if(this.auth.isLogedin()==true)
    {this.router.navigate(['chekout'], {relativeTo:this.route})}
    else
    {this.router.navigate(['loginUser'],{ replaceUrl: true })}
  }
}
