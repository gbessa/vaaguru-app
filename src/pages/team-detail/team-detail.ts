import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamDTO } from '../../models/team.dto';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team: TeamDTO;
  teamImage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.get('item');
    this.loadData();
  }

  loadData() {    
    if (this.team === undefined) {
      this.navCtrl.setRoot('HomePage');
      return
    }
    this.teamImage = `assets/imgs/${this.team.imageUrl || 'team-blank.jpg'}`
  }

}
