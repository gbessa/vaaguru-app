import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamService } from '../../services/domain/team.service';
import { TeamDTO } from '../../models/team.dto';

@IonicPage()
@Component({
  selector: 'page-team-edit',
  templateUrl: 'team-edit.html',
})
export class TeamEditPage {

  team: TeamDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public teamService: TeamService) {
      this.team = this.navParams.get('item');
  }

  removeTeam() {
    this.teamService.remove(this.team)
    .subscribe(response => {
      this.navCtrl.setRoot('TeamsPage');
    },
    error => {});
  }

}
