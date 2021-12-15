import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth-login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username=""
  password=""
  loginString:string;
  encodedKey:string;
  encodedUname:string;
  Token:string;
  response:boolean;
  login:boolean=true;

  constructor(private loginAuth: AuthLoginService,private router:Router) { }

  ngOnInit(): void {
    this.chekuser()
  }
  chekuser(){
    this.username=(<HTMLInputElement>document.getElementById('userid')).value;
    this.login=true;
    document.getElementById('password').hidden = true;
    document.getElementById('Spassword').hidden = true;
    document.getElementById('m_password').hidden = true;
    document.getElementById('m_Spassword').hidden = true;
    if(this.username.length>9){
    this.encodedUname=btoa(this.username);
    this.loginAuth.chekUserName(this.encodedUname)
    this.loginAuth.chekUserName(this.encodedUname).subscribe(data=>{
      this.response=data;
      if( this.response ==true){
        document.getElementById('password').hidden = false;
        document.getElementById('Spassword').hidden = false;
      }else{
        document.getElementById('password').hidden = true;
        document.getElementById('Spassword').hidden = true;
      }
      });
    }
  }

  continue(){
    this.username=(<HTMLInputElement>document.getElementById('userid')).value;
    this.password=(<HTMLInputElement>document.getElementById('password')).value;
    this.loginAuth.chekUserName(this.encodedUname).subscribe(data=>{
      this.response=data;
      if( this.response ==true)
      {this.dologin(this.username, this.password);}
      else{
        sessionStorage.removeItem('Tl');
        this.router.navigate(['/$/',btoa(this.username)]).then(() => {
     //     window.location.reload();
        });
      }
    });
  }


  m_chekuser(){
    this.username=(<HTMLInputElement>document.getElementById('m_userid')).value;
    this.login=true;
    document.getElementById('m_password').hidden = true;
    document.getElementById('m_Spassword').hidden = true;
    if(this.username.length>9){
    this.encodedUname=btoa(this.username);
    this.loginAuth.chekUserName(this.encodedUname)
    this.loginAuth.chekUserName(this.encodedUname).subscribe(data=>{
      this.response=data;
      if( this.response ==true){
        document.getElementById('m_password').hidden = false;
        document.getElementById('m_Spassword').hidden = false;
      }else{
        document.getElementById('m_password').hidden = true;
        document.getElementById('m_Spassword').hidden = true;
      }
      });
    }
  }
  m_continue(){
    this.username=(<HTMLInputElement>document.getElementById('m_userid')).value;
    this.password=(<HTMLInputElement>document.getElementById('m_password')).value;
    this.loginAuth.chekUserName(this.encodedUname).subscribe(data=>{
      this.response=data;
      if( this.response ==true)
      {this.dologin(this.username, this.password);}
      else{
        sessionStorage.removeItem('Tl');
        this.router.navigate(['/$/',btoa(this.username)]).then(() => {
          window.location.reload();
        });
      }
    });
  }
  dologin(user:string, pass:string){
    let res ="";
    this.loginString=user+':'+pass;
    this.encodedKey=btoa(this.loginString);
    this.loginAuth.Login(this.encodedKey).subscribe(data =>{
      res=data;
    if(res=="error")
    {
      this.login=false
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
