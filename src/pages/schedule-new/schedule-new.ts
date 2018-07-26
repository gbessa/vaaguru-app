import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScheduleService } from '../../services/domain/schedule.service';
import { TeamDTO } from '../../models/team.dto';
import { TeamService } from '../../services/domain/team.service';
import { StorageService } from '../../services/storage.service';
import { ScheduleDTO } from '../../models/schedule.dto';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-schedule-new',
  templateUrl: 'schedule-new.html',
})
export class ScheduleNewPage {

  formGroup: FormGroup;
  ownedTeams: TeamDTO[];
  rowers: any[] = [];
  localUser: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public scheduleService: ScheduleService,
    public teamService: TeamService,
    public storage: StorageService) {

      this.localUser = this.storage.getLocalUser();
      this.rowers.push({
        email: this.localUser.email,
        name: this.localUser.email
      });

      this.teamService.findOwned()
      .subscribe(response => {
        //console.log(response);
        this.ownedTeams = response;
      },
      error => {})

      this.formGroup = this.formBuilder.group({
        date: [new Date(moment().locale('pt-br').format()).toISOString(), [Validators.required]],
        numOfSeats: [null, [Validators.required]],
        team_id: [null, Validators.required],
        rowerResponsable_email: [this.rowers[0].email, Validators.required],
        obs: [null, null]
      });

  }

  ionViewDidLoad() {

  }

  confirm() {
    this.scheduleService.insert(this.formGroup.value)
    .subscribe(response => {
      const scheduleId : string = this.extractId(response.headers.get('location'));
      this.scheduleService.findById(scheduleId)
      .subscribe(response =>  {
        const schedule = response as ScheduleDTO;
        this.navCtrl.setRoot("ScheduleDetailPage", {
          item: schedule
        })
      })
    },
    error => {});
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring(position+1, location.length);
  }

}
