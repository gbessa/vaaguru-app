import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamDTO } from '../../models/team.dto';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  item: TeamDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    this.loadData();
  }

  loadData() {    
    if (this.item === undefined) {
      this.navCtrl.setRoot('HomePage');
      return
    }
  }

}
