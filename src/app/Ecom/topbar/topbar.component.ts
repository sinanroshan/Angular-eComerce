import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { AuthLoginService } from 'src/app/service/auth-login.service';
import { ProductItemService } from 'src/app/service/product-item.service';
import { ProductService } from 'src/app/service/product.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  
  mob_sidbar:boolean=false;

  public TotalCartItem : Number =0;
  Supercategory:Product[]|any;
  SubCategory:any;
  productList:Product[]|any;
  sCtegory:any;
  search:any;
  profile:any[];
  name="";
  fname="";
  constructor(private productsurvice:ProductService, 
            private router:Router,
            private auth:AuthLoginService, 
            private productitemService:ProductItemService) { 
            }



  ngOnInit(): void {
    this.issign();
    this.getSuperCatogary();
    this.totalcartItem();
  }
  getSubcategory(c){
    let SCategory = (c.target.value);
    this.productsurvice.getCatogeryList(SCategory).subscribe(data =>{
      this.SubCategory = data;
    });
  }
   //product category list
   getSuperCatogary(){
    this.productsurvice. getSuperCategory()
    .subscribe(data =>{
       this.Supercategory = data;
     });
   }

  showProducts(c){
    this.sCtegory=(c.target.value);
      this.router.navigate(['/shoping', this.sCtegory]).then(() => {
        window.location.reload();
      });   
  }
 Search(event:string){
   this.search=event;
   if(this.search.length>2){
   this.search="search?="+this.search;
   this.router.navigate(['/shoping', this.search]).then(() => {
    window.location.reload();
    //[routerLink]="['/shop/product', Product.productId]"
  }); }  
 }

 searchItems(event:string){
  this.search=event;
  this.productList=null
  for(let i=this.search.length;i>1;)
  {
    this.productsurvice.serchKeyword(this.search).subscribe(data =>{
      this.productList = data;
      if(data.length==0 && this.search.length<1)
      {document.getElementById('suggestionBox').hidden=true;}
      else{document.getElementById('suggestionBox').hidden=false;}
      
    });
    break;
  }
}
totalcartItem(){
  this. productitemService.getCartItem().subscribe(res=>{
    this.TotalCartItem= res.length;
    if(this.TotalCartItem<1)
    {
      document.getElementById('badge').hidden = true;
    }
  });
}
showCategory(event){
  this.sCtegory=(event.target.value);
  this.router.navigate(['/ShopBy', this.sCtegory]).then(() => {
    window.location.reload();
    this.mob_sidbar=!this.mob_sidbar
  });   
}
issign(){
  if(this.auth.isLogedin()==false)
  {       this.name="Profile";
          this.fname="welcome";
          document.getElementById('signout').hidden = true;
  }
  else
        {document.getElementById('login').hidden = true;
        this.auth.getUser().subscribe(res=>{
          this.profile=res;
          this.name=this.profile[1];
          this.fname=this.profile[1]+" "+this.profile[2];
        });
        console.log(this.name);
      
        }
}
  goto(){
    if(this.auth.isLogedin()==false)
    {this.router.navigate(['loginUser'],{ replaceUrl: true })}
  }
  signout(){
    this.auth.Auth_signout();
    localStorage.removeItem('cart');
      window.location.reload();
  }
  route(event){
    this.router.navigate(['/shop/product', event]).then(() => {
      window.location.reload();
    });

  }

  order(){
    if(this.auth.isLogedin()==true)
    {this.router.navigate(['myorders'], { replaceUrl: true })}
    else
    {this.router.navigate(['loginUser'], { replaceUrl: true })}
  }

  //mobview
  openMenu() {
    this.mob_sidbar=!this.mob_sidbar

  }
  closeMenu() {
    this.mob_sidbar=!this.mob_sidbar

  }

}



