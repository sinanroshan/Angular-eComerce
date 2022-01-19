import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductItemService } from 'src/app/service/product-item.service';
import { ProductService } from 'src/app/service/product.service';



@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  productList: Product[] | any;
  sCtegory="";
  
  constructor(private productsurvice : ProductService, 
    private router : Router,private Arouter : ActivatedRoute, private productItemservice : ProductItemService) { }
  
  totalRecords:any;
  c="";
  key="";

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
  ngOnInit(): void {
    this.sCtegory= this.Arouter.snapshot.paramMap.get('item');
    for(let i=0; i<8; i++){
      this.c=this.c+this.sCtegory.charAt(i);
    }
    if(this.c=="search?=")
    { for(let i=8;i<this.sCtegory.length; i++){
    this.key=this.key+this.sCtegory.charAt(i);}
    this.search()
    }
    else{
     this.showProducts();}
  }

  showProducts(){
    if (this.sCtegory=="all")
    { this.getProducts()}
    else
    {
     this.productsurvice.getProductByCategory(this.sCtegory).subscribe(data =>{
       this.productList = data;
       this.totalRecords=data.length;
       //console.log(this.totalRecords);
       document.getElementById('loading').hidden = true;
       document.getElementById('loading1').hidden = true;
    });}
  }
//*****get All Products*****
   getProducts(){
   this.productsurvice.randomProduct().subscribe(data =>{
      this.productList = data;
      document.getElementById('loading').hidden = true;
    });
  }

  search(){
    this.productsurvice.serchProducts(this.key).subscribe(data =>{
      this.productList = data;
      document.getElementById('loading').hidden = true;
     // console.log(data);
    });
  }

 scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("toTop").style.display = "block";
  } else {
      document.getElementById("toTop").style.display = "none";
  }
}

gotoTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

viewProduct(item){
  this.router.navigate(['shop/product/',item]).then(() => {
     });   
}
AddtoCart(item){
  item.Quantity=1;
  item.Total=item.price;
  this.productItemservice.getProductitem(item);
}
}

