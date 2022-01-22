import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pid } from 'process';
import { Product } from 'src/app/Model/product';
import { ProductItemService } from 'src/app/service/product-item.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
product: Product[];
SuggesionList: Product[];
category="";
pId="";
adtoCart:boolean=false;
  constructor(private productitemservice : ProductItemService,
        private Arouter : ActivatedRoute, private productsurvice : ProductService,
        private router : Router) { }

  ngOnInit(): void {
    this.pId= this.Arouter.snapshot.paramMap.get('item');
    this.getProduct()
  }
getProduct(){
  this.productitemservice.ViewProduct(this.pId).subscribe(data =>{
    this.product = data;
    console.log(this.category)
    this.sugestList()
  });
}
AddtoCart(item){
  item.Quantity=1;
  this.adtoCart=true;
  item.Total=item.price;
  this.productitemservice.getProductitem(item);
}
sugestList(){
  this.productsurvice.prodSuggList(this.pId).subscribe(res=>{
    this.SuggesionList=res
  })
}
rerout(pname){
this.router.navigate(['/shop/product',pname]).then(() => {
  window.location.reload()
}); 
}

}
