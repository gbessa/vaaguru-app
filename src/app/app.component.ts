import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string, iconName: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthService
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Meus Dados', iconName: 'person', component: 'ProfilePage' },
      { title: 'Agendas', iconName: 'calendar', component: 'SchedulesPage' },
      { title: 'Equipes', iconName: 'people', component: 'TeamsPage' },
      { title: 'Logout', iconName: 'log-out', component: '' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.title === 'Logout') {
      this.authService.logout();
      this.nav.setRoot('HomePage');
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
