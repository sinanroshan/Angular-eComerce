import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthLoginService } from 'src/app/service/auth-login.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public dialog: MatDialog,
               private router:Router,
               private auth:AuthLoginService,
              private modalService: NgbModal) { }

  orderInv:any; 
  cancelInvNo:any;           
  ngOnInit(): void {
    this.isLoggedin();
    this.getOrderList()
  }
  isLoggedin(){
    if(this.auth.isLogedin()==true)
    {this.router.navigate(['myorders'], { replaceUrl: true })}
  else{this.router.navigate(['loginUser'],{ replaceUrl: true })}
  }
  getOrderList(){
    this.auth.getOrder().subscribe(res=>{
      this.orderInv = res;
    });
  }
  viewOrder(invNo){
    this.router.navigate(['/order-details', btoa(invNo)]);
  }

  cnacel(cancelitemAlert,inv) {
    this.cancelInvNo=inv;
    this.modalService.open(cancelitemAlert, { centered: true , size:'sm'});
  }
  closemodel(cancelitemAlert){
    this.modalService.dismissAll(cancelitemAlert);
  }
  cancelItem(cancelitemAlert){
    this.auth.cancelOrder(this.cancelInvNo,"Cancelled").subscribe(res=>{
      window.location.reload();
    });
    this.modalService.dismissAll(cancelitemAlert);
  }
}
