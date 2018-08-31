import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScheduleService } from '../../services/domain/schedule.service';
import { ScheduleDTO } from '../../models/schedule.dto';
import { TeamService } from '../../services/domain/team.service';
import { TeamDTO } from '../../models/team.dto';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-schedules',
  templateUrl: 'schedules.html',
})
export class SchedulesPage {

  items: ScheduleDTO[];
  ownedTeams: TeamDTO[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public scheduleService: ScheduleService,
    public teamService: TeamService,
    private statusBar: StatusBar) {

      // let status bar overlay webview
      //this.statusBar.overlaysWebView(true);

      // set status bar to white
      this.statusBar.backgroundColorByHexString('#4B4E6D');
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    this.scheduleService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {})

    this.teamService.findOwned()
    .subscribe(response => {
      this.ownedTeams = response;
    },
    error => {})
  }

  showDetail(item: ScheduleDTO) {
    this.navCtrl.push('ScheduleDetailPage', {
      item: item
    })
  }  

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  } 

}
