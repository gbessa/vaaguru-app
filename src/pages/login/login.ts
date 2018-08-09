import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  creds: CredentialsDTO = {
    email: "",
    password: ""
  };
  show: boolean = false;
  passwordInputType: string = 'password'

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ){
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('SchedulesPage');  
    },
    error => {}) 
  }

  login() {
    //this.navCtrl.setRoot('SchedulesPage');  BYPASS
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('SchedulesPage');  
      },
    error => {})
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  goToForgotPassword() {
    this.navCtrl.push('ForgotPasswordPage');
  }

  toggleShow(){
    this.show = !(this.show);
    this.passwordInputType = this.show ? 'text' : 'password'
  }

}
