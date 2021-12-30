import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductItemService } from 'src/app/service/product-item.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
product: Product[] | any;
pId="";
adtoCart:boolean=false;
  constructor(private productitemservice : ProductItemService,
    private Arouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.pId= this.Arouter.snapshot.paramMap.get('item');
    this.getProduct()
  }
getProduct(){
  this.productitemservice.ViewProduct(this.pId).subscribe(data =>{
    this.product = data;
    console.log(this.product)
  });
}
AddtoCart(item){
  item.Quantity=1;
  this.adtoCart=true;
  item.Total=item.price;
  this.productitemservice.getProductitem(item);
}
}
