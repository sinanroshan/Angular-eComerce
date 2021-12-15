import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private Arouter : ActivatedRoute,
    private loginAuth: AuthLoginService,
    private router:Router ) { }
  phone:string;
  fname:string
  sname:string
  emailid:string
  pass1:string
  pass2:string
  Token:string;
  

  ngOnInit(): void {
    this.getPhoneNo();
  }
getPhoneNo(){
  this.phone=atob(this.Arouter.snapshot.paramMap.get('token'));
}
SignUp() {
  let res:string;
  this.fname=(<HTMLInputElement>document.getElementById("fname")).value;
  this.sname=(<HTMLInputElement>document.getElementById("sname")).value;
  this.emailid=(<HTMLInputElement>document.getElementById("email")).value;
  this.pass1=(<HTMLInputElement>document.getElementById("p1")).value;
  this.pass2=(<HTMLInputElement>document.getElementById("p2")).value;
  if(this.chekvalid()){
    let cfname=btoa(this.fname);
    let csname=btoa(this.sname);
    let cemailid=btoa(this.emailid);
    let cpass=btoa(this.pass1);
    let cphone=btoa(this.phone);

    this.loginAuth.register(cfname,csname,cphone,cemailid,cpass).subscribe(data =>{
      res=data;
      console.log(res)
    if(res=="error")
    {
      localStorage.removeItem('Tl');
    }else{
      this.Token=btoa(res);
      localStorage.setItem('Tl',this.Token);
      this.router.navigate([''],{ replaceUrl: true }).then(() => {
      window.location.reload();});
      }
    });
  }
}
chekvalid() :boolean{
  if(this.passValid())
  return true;
  else return false
}
nameValid(){
}
passValid():boolean{
  if(this.pass1==this.pass2)
  return true;
  else return false
}
}
