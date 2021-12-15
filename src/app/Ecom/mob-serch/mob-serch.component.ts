import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductService } from 'src/app/service/product.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-mob-serch',
  templateUrl: './mob-serch.component.html',
  styleUrls: ['./mob-serch.component.css']
})
export class MobSerchComponent implements OnInit {

  search:any;
  productList:Product[]|any;
  constructor(
    private productsurvice:ProductService, 
            private router:Router,
            private _location: Location
  ) { }

  ngOnInit(): void {
  }

  Search(event:string){
    this.search=event;
    if(this.search.length>2){
    this.search="search?="+this.search;
    this.router.navigate(['/shoping', this.search]).then(() => {
     window.location.reload();
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
 
 route(event){
  this.router.navigate(['/shop/product', event]).then(() => {
    window.location.reload();
  });

}

 backClicked() {
  this._location.back();
}

}
