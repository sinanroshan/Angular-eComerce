import { Component, OnInit } from '@angular/core';
import { Company } from '../Model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.css']
})
export class BottombarComponent implements OnInit {
  companyData:Company;
  constructor(private productsurvice:ProductService) { }

  ngOnInit(): void {
    this.productsurvice.getCompanyData().subscribe(res=>{
      this.companyData =res;
      console.log(this.companyData)
    })
  }

}
