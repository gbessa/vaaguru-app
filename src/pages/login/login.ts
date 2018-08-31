import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, ModalController, ToastController } from 'ionic-angular';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../services/auth.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { StatusBar } from '@ionic-native/status-bar';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  creds: CredentialsDTO = {
    email: "",
    password: "",
    facebookToken: ""
  };
  show: boolean = false;
  passwordInputType: string = 'password'
  faceResponse: any;
  previousLocalUser: any;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public modalCtrl: ModalController,
    public auth: AuthService,
    private fb: Facebook,
    private toastCtrl: ToastController,
    private statusBar: StatusBar,
    public storage: StorageService
  ){
    this.statusBar.hide();
    this.previousLocalUser = this.storage.getLocalUser();
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
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfullLogin(response.headers.get('Authorization'));
        this.presentToast('Logged! Seja bem vindo.');
        this.onSuccessfullLogin();  
      },
    error => {})
  }

  loginWithFacebook() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.faceResponse = res;
        this.auth.authenticateWithFacebook(res.authResponse.accessToken)
        .subscribe(response => {
          this.auth.successfullLogin(response.headers.get('Authorization'));
          this.presentToast('Logged with Facebook!');
          this.onSuccessfullLogin(); 
        },
        error => {this.presentToast('Falha no login')});
      }).catch(e => {
        this.presentToast('Error logging into Facebook');
      });
        
  }

  onSuccessfullLogin() {
    this.statusBar.show();
    this.navCtrl.setRoot('SchedulesPage'); 
  }

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }

  forgotPassword() {
    const modal = this.modalCtrl.create('ForgotPasswordPage');
    modal.present();
  }

  toggleShow(){
    this.show = !(this.show);
    this.passwordInputType = this.show ? 'text' : 'password'
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
