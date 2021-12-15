import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth-login.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  constructor(private Arouter : ActivatedRoute,
    private auth:AuthLoginService) { }

  invNo="";
  bill=[];
  orderProducts=[];
  landmark:boolean=true;
  ngOnInit(): void {
    this.invNo= atob(this.Arouter.snapshot.paramMap.get('inv'));
    this.getOrder();
    this.getOrderList();
  }
  getOrder(){
    this.auth.billdata(this.invNo).subscribe(res=>{
      this.bill = res;
      if(this.bill[10]==null){this.landmark=!this.landmark;}
    });
  }
  getOrderList(){
    this.auth.getOrderList(this.invNo).subscribe(res=>{
      this.orderProducts = res;
    });
  }
  print(){
    window.print();
  }
}
