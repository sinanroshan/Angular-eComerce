import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private Arouter : ActivatedRoute, 
    private productsurvice:ProductService,private router:Router) { }

public sCtegory:any;
public SubCategory:any;
  ngOnInit(): void {
    this.sCtegory= this.Arouter.snapshot.paramMap.get('category');
    this.getSubcategory();
  }
  getSubcategory(){
    this.productsurvice.getCatogeryList(this.sCtegory).subscribe(data =>{
      this.SubCategory = data;
      console.log(this.SubCategory)
    });
  }
  showProducts(c){
    this.sCtegory=(c.target.value);
      this.router.navigate(['/shoping', this.sCtegory]).then(() => {
        window.location.reload();
      });   
  }
}
