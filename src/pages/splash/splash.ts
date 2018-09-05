import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public splashScreen: SplashScreen,
    public auth: AuthService
  ) {
  }

  ionViewDidEnter() {
 
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('SchedulesPage');  
    },
    error => {
      this.navCtrl.setRoot('LoginPage');  
    }) 
  }

}
