import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScheduleService } from '../../services/domain/schedule.service';
import { TeamDTO } from '../../models/team.dto';
import { TeamService } from '../../services/domain/team.service';
import { StorageService } from '../../services/storage.service';
import { ScheduleDTO } from '../../models/schedule.dto';
import * as moment from 'moment';
import { DatePicker } from '@ionic-native/date-picker';

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

  minDate: string;
  maxDate: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public scheduleService: ScheduleService,
    public teamService: TeamService,
    public storage: StorageService,
    private datePicker: DatePicker) {

      this.localUser = this.storage.getLocalUser();
      this.rowers.push({
        email: this.localUser.email,
        name: this.localUser.email
      });

      this.formGroup = this.formBuilder.group({
        date: [moment(new Date().toISOString()).locale('pt-br').format(), [Validators.required]],
        start_date: [new Date(moment().locale('pt-br').format()).toISOString(), [Validators.required]],
        numOfSeats: [null, [Validators.required]],
        team_id: [null, Validators.required],
        rowerResponsable_email: [this.rowers[0].email, Validators.required],
        obs: [null, null]
      });

      this.teamService.findOwned()
      .subscribe(response => {
        //console.log(response);
        this.ownedTeams = response;
        this.formGroup.patchValue({team_id: this.ownedTeams[0].id}) 
      },
      error => {})


      this.minDate = moment().format('YYYY');
      this.maxDate = moment().add(1, 'years').format('YYYY');
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

  showDateTimePicker(event) {
    this.datePicker.show({
        date: new Date(this.formGroup.get('date').value),
        mode: 'datetime',
        is24Hour: true,
        allowOldDates: false,
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
        date => { 
          // event.target.value = date
          let dataString = moment(date.toISOString()).locale('pt-br').format();
          this.formGroup.patchValue({date: dataString}) 
        },
        err => console.log('Error occurred while getting date: ' + err)
    )
  }

}
