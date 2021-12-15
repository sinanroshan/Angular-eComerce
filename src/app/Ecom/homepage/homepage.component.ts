import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  image1:string = "../images/slide1.jpg";

  sCtegory:any;
  Supercategory:any;
  constructor(private productsurvice:ProductService,
              private router:Router,) { }

  ngOnInit(): void {
    this.getSuperCatogary()
  }
   //product category list
   getSuperCatogary(){
    this.productsurvice. getSuperCategory()
    .subscribe(data =>{
       this.Supercategory = data;
     });
   }
   showCategory(event){
    this.sCtegory=(event.target.value);
    this.router.navigate(['/ShopBy', this.sCtegory]);
  }

  m_showCategory(event){
    this.sCtegory=event;
    this.router.navigate(['/ShopBy', this.sCtegory]);
  }
}
