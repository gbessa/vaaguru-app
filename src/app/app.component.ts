import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { SplashPage } from '../pages/splash/splash';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: string = 'LoginPage';
  rootPage: string = 'SplashPage';

  pages: Array<{title: string, iconName: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthService,
    public modalCtrl: ModalController
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Meus Dados', iconName: 'person', component: 'ProfilePage' },
      { title: 'Agendas', iconName: 'calendar', component: 'SchedulesPage' },
      { title: 'Equipes', iconName: 'people', component: 'TeamsPage' },
      { title: 'Sair', iconName: 'log-out', component: '' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();

      //let splash = this.modalCtrl.create('SplashPage');
      //splash.present();

    });
  }

  openPage(page) {
    if (page.title === 'Sair') {
      this.authService.logout();
      this.nav.setRoot('LoginPage');
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
