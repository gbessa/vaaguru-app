import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScheduleService } from '../services/domain/schedule.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { InscriptionService } from '../services/domain/inscription.service';

import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { TeamService } from '../services/domain/team.service';
import { RowerService } from '../services/domain/rower.service';
import { CountryService } from '../services/domain/country.service';
import { CityService } from '../services/domain/city.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScheduleService,
    TeamService,
    RowerService,
    InscriptionService,
    CountryService,
    CityService,
    AuthService,
    StorageService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class AppModule {}
