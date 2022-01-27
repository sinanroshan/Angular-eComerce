import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthLoginService } from 'src/app/service/auth-login.service';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private loginAuth: AuthLoginService,
    public dialogRef: MatDialogRef<AddressComponent>,
    ) { }
  fname:string;
  phone:string;
  Area:string;
  House_n:string;
  Pincode:string;
  Landmark:string;
  Town_city:string

  ngOnInit(): void {
    
  }
  addAddress(){
    this.fname=btoa((<HTMLInputElement>document.getElementById("fname")).value);
    this.phone=btoa((<HTMLInputElement>document.getElementById("phone")).value);
    this.Area=btoa((<HTMLInputElement>document.getElementById("area")).value);
    this.House_n=btoa((<HTMLInputElement>document.getElementById("house_n")).value);
    this.Pincode=btoa((<HTMLInputElement>document.getElementById("pincode")).value);
    this.Landmark=(<HTMLInputElement>document.getElementById("landmark")).value;
    this.Town_city=btoa((<HTMLInputElement>document.getElementById("town_city")).value); 
    let token=atob(localStorage.getItem('Tl'));
    if(this.Landmark=="")
    {this.Landmark="null";
    this.Landmark=btoa(this.Landmark);} else {this.Landmark=btoa(this.Landmark);}
    this.loginAuth.setAddress(token,this.fname,this.phone,this.Area,this.House_n,this.Pincode,this.Landmark, this.Town_city).subscribe(res=>{
     let result = res
    });window.location.reload();
  }

  m_addAddress(){
    this.fname=btoa((<HTMLInputElement>document.getElementById("m_fname")).value);
    this.phone=btoa((<HTMLInputElement>document.getElementById("m_phone")).value);
    this.Area=btoa((<HTMLInputElement>document.getElementById("m_area")).value);
    this.House_n=btoa((<HTMLInputElement>document.getElementById("m_house_n")).value);
    this.Pincode=btoa((<HTMLInputElement>document.getElementById("m_pincode")).value);
    this.Landmark=(<HTMLInputElement>document.getElementById("m_landmark")).value;
    this.Town_city=btoa((<HTMLInputElement>document.getElementById("m_town_city")).value); 
    let token=atob(localStorage.getItem('Tl'));
    if(this.Landmark=="")
    {this.Landmark="null";
    this.Landmark=btoa(this.Landmark);} else {this.Landmark=btoa(this.Landmark);}
    this.loginAuth.setAddress(token,this.fname,this.phone,this.Area,this.House_n,this.Pincode,this.Landmark, this.Town_city).subscribe(res=>{
     let result = res
    });window.location.reload();
  }
}
