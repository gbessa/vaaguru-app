import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamDTO } from '../../models/team.dto';
import { TeamService } from '../../services/domain/team.service';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  items: TeamDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public teamService: TeamService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    this.teamService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {})
  }  

  showDetail(item: TeamDTO) {
    this.navCtrl.push('TeamDetailPage', {
      item: item
    })
  }   

}
