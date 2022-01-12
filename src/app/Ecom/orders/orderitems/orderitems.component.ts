import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from 'src/app/service/auth-login.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orderitems',
  templateUrl: './orderitems.component.html',
  styleUrls: ['./orderitems.component.css']
})
export class OrderitemsComponent implements OnInit {

  constructor(private auth:AuthLoginService,
              private Arouter : ActivatedRoute,
              private router:Router,
              private _location: Location,
              private modalService: NgbModal
  ) { }
  inv:any;
  bill:any;
  mrpTotal=0;
  total=0;
  discount=0;
  
  landmark:boolean=false;
  orderProducts:any[][];
  
  cancelP_id:any;
  cancelP_name:any;
  
  ngOnInit(): void {
    this.inv=atob(this.Arouter.snapshot.paramMap.get('inv'));
    this.getOrder();
    this.getOrderLst();
    }
    getOrder(){
      this.auth.billdata(this.inv).subscribe(res=>{
        this.bill = res;
        if(this.bill[10]==null){this.landmark=false;}
        console.log(this.bill)
      });
    }
  getOrderLst(){
    this.auth.getOrderList(this.inv).subscribe(res=>{
      this.orderProducts = res;
      console.log(this.orderProducts)
      let i;
      for(i=0; i<this.orderProducts.length;i++){
        this.mrpTotal= this.mrpTotal+(this.orderProducts[i][7] *this.orderProducts[i][4]);
        this.total=this.total+(this.orderProducts[i][6] *this.orderProducts[i][4]);
      }
      this.discount=this.mrpTotal-this.total;
    });
  }
  getOrderSummery(){
    let invNo=btoa(this.inv);
    this.router.navigate(['order/summary', invNo])
  }
  backClicked(){
    this._location.back();
  }


cnacel(cancelitemAlert, p_id,p_name) {
  this.cancelP_id=p_id;
  this.cancelP_name=p_name;
  this.modalService.open(cancelitemAlert, { centered: true , size:'sm'});
}
closemodel(cancelitemAlert){
  this.modalService.dismissAll(cancelitemAlert);
}
cancelItem(cancelitemAlert){
  this.auth.cancelThis(this.inv, this.cancelP_id,"Cancelled").subscribe(res=>{
    window.location.reload();
  });
  this.modalService.dismissAll(cancelitemAlert);
}
gohome(){
  this.router.navigate(['']);
}
}


