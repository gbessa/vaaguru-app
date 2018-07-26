import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScheduleService } from '../../services/domain/schedule.service';
import { ScheduleDTO } from '../../models/schedule.dto';
import { TeamService } from '../../services/domain/team.service';
import { TeamDTO } from '../../models/team.dto';

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
    public teamService: TeamService) {
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
