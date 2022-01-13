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
  allCetegory:any;
  constructor(private productsurvice:ProductService,
              private router:Router,) { }

  ngOnInit(): void {
    this.getSuperCatogary()
    this.getAllcategoryList();

  }
   //product category list
   getSuperCatogary(){
    this.productsurvice.getSuperCategory()
    .subscribe(data =>{
       this.Supercategory = data;
     });
   }
   getAllcategoryList(){
    this.productsurvice.getAllsubCategory().subscribe(res=>{
      this.allCetegory=res;
    })
  }
   showCategory(event){
    this.sCtegory=(event.target.value);
    this.router.navigate(['/ShopBy', this.sCtegory]);
  }
  m_showCategory(event){
    this.sCtegory=event;
    this.router.navigate(['/ShopBy', this.sCtegory]);
  }
  showProducts(c:string){
    //this.sCtegory=(c.target.value);
      this.router.navigate(['/shoping',c]).then(() => {
        window.location.reload();
      });   
  }
}
