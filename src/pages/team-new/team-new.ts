import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from '../../services/domain/team.service';
import { TeamDTO } from '../../models/team.dto';
import { StorageService } from '../../services/storage.service';
import { CountryService } from '../../services/domain/country.service';
import { CityService } from '../../services/domain/city.service';

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
    public cityService: CityService) {

      this.localUser = this.storage.getLocalUser();

      this.formGroup = this.formBuilder.group({
        name: [null, [Validators.required]],
        countryId: ['BRA', [Validators.required]],
        stateId: ['Rio de Janeiro', [Validators.required]],
        cityId: [null, [Validators.required]],
        description: [null, Validators.required],
        imageUrl: [null, null]
      });
  }

  ionViewDidLoad() {
    this.cityService.getData()
    .subscribe(response => {
      //console.log(response);
      let data = response as any;
      this.states = data.estados;
      this.updateCities('Rio de Janeiro');
    })

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
  }

  updateCities(state_name: string){
    let state_name_1 = this.formGroup.controls['stateId'].value;
    this.cities = this.getStateByName(state_name_1).cidades;
  }

  getStateByName(state_name: string) {
    let state = this.states.filter((state) => state.nome === state_name);
    return state[0];
  }

}
