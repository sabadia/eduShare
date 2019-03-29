import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  username: string ;
  password: string ;
  email: string;
  registrationUsername: string;
  registrationPassword: string;
  registrationPasswordRepeat: string;


  search(search: string) {
    console.log(search);
  }

  login() {
    console.log(`welcome ${this.username}`);
  }

  loginWithFacebook() {
    console.log('login with fb');
  }

  loginWithTwitter() {
    console.log('login with twitter');
  }

  registration() {
    console.log(`${this.registrationUsername}  ${this.registrationPassword} ${this.email} ${this.registrationPasswordRepeat}`);
  }

  constructor(public AppComp: AppComponent) { }
  changeIsLogin() {
    this.AppComp.isLogin = !this.AppComp.isLogin;
    this.isLogin = this.AppComp.isLogin;
  }
  ngOnInit() {
    this.isLogin = this.AppComp.isLogin;
  }

}
