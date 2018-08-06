import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from '../../services/domain/team.service';
import { TeamDTO } from '../../models/team.dto';
import { StorageService } from '../../services/storage.service';
import { CountryService } from '../../services/domain/country.service';
import { StateService } from '../../services/domain/state.service';

@IonicPage()
@Component({
  selector: 'page-team-new',
  templateUrl: 'team-new.html',
})
export class TeamNewPage {

  formGroup: FormGroup;
  localUser: any;
  countries: any;
  states: any;
  cities: any;

  constructor(
    public navCtrl: NavController, 
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public teamService: TeamService,
    public storage: StorageService,
    public countryService: CountryService,
    public stateService: StateService) {

      this.localUser = this.storage.getLocalUser();

      this.formGroup = this.formBuilder.group({
        name: [null, [Validators.required]],
        countryId: ['BRA', [Validators.required]],
        stateId: [null, [Validators.required]],
        cityId: [null, [Validators.required]],
        description: [null, Validators.required],
        imageUrl: [null, null]
      });
  }

  ionViewDidLoad() {
    this.countryService.findAll()
    .subscribe(response => {
      this.countries = response;
      this.updateStates();
    },
    error => {})
  }

  confirm() {
    let newTeam = this.formGroup.value;
    newTeam.owner_email = this.localUser.email;
    console.log(newTeam);
    this.teamService.insert(newTeam)
    .subscribe(response => {
      const teamId : string = this.extractId(response.headers.get('location'));
      this.teamService.findById(teamId)
      .subscribe(response =>  {
        const team = response as TeamDTO;
        this.navCtrl.setRoot("TeamDetailPage", {
          item: team
        })
      })
    },
    error => {});
  }

  private extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring(position+1, location.length);
  }

  updateStates() {
    this.stateService.findAll()
    .subscribe(response => {
      this.states = response;
      this.updateCities();
    },
    error => {})
  }

  updateCities(){

  }

}
