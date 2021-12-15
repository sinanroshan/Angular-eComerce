import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth-login.service';
import { ProductItemService } from 'src/app/service/product-item.service';
import { AddressComponent } from '../address/address.component';


@Component({
  selector: 'app-chekout',
  templateUrl: './chekout.component.html',
  styleUrls: ['./chekout.component.css']
})
export class ChekoutComponent implements OnInit {

  constructor(private productitemservice : ProductItemService,
                    private router:Router,
                   private auth:AuthLoginService,
                   public dialog: MatDialog) { }

  public cart : any= [];
  public TotalMrp =0;
  public TotalPrice = 0;
  public DiscountOnMrp =0;
  Add:[];

  Fname:string;
  mob:string;
  pin:string;
  place:string;
  House:string;
  city:string;
  landmark:string;

  ngOnInit(): void {
    this.isLoggedin();
    this.Cart();
    this.getBil();
    this.getAddress();
  }
  isLoggedin(){
    if(this.auth.isLogedin()==true)
    {this.router.navigate(['bag/chekout'], { replaceUrl: true })}
  else{this.router.navigate(['loginUser'],{ replaceUrl: true })}
  }
  Cart(){
    this.productitemservice. getCartItem().subscribe(res=>{
      this.cart = res});
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
    addAddress(){
      const dialogRef = this.dialog.open(AddressComponent, {
        width: '650px',
      });
    }
    getAddress(){
      let Adress;
      this.auth.getAdd().subscribe(res=>{
        Adress = res;
        this.Add=Adress;
      this.Fname=Adress[0];
      this.mob=Adress[1];
      this.place=Adress[2];
      this.House=Adress[3];
      this.pin=Adress[4];
      this.landmark=Adress[5];
      this.city=Adress[6];
      if(this.landmark =="null"|| this.landmark=="NULL"){this.landmark="Not Given";}
      if(this.Fname=="" || this.Fname=="null"){this.Add=null;}
    });
    }
    confirmOrder(){
      let billAmount=this.TotalPrice;
      this.auth.order(billAmount).subscribe(res=>{
        console.log(res);
                    if(res=="ACCEPTED"){
                    localStorage.removeItem('cart');
                    this.router.navigate(['myorders'], { replaceUrl: true });
                  }
      });
    }
}


