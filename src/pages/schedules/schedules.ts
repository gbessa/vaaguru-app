import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScheduleService } from '../../services/domain/schedule.service';
import { ScheduleDTO } from '../../models/schedule.dto';

@IonicPage()
@Component({
  selector: 'page-schedules',
  templateUrl: 'schedules.html',
})
export class SchedulesPage {

  items: ScheduleDTO[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public scheduleService: ScheduleService) {
  }

  ionViewDidLoad() {
    this.scheduleService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {})
  }


  showDetail(item: ScheduleDTO) {
    this.navCtrl.push('ScheduleDetailPage', {
      item: item
    })
  }  

}
