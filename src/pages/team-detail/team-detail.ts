import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TeamDTO } from '../../models/team.dto';
import { InvitationDTO } from '../../models/invitation.dto';
import { TeamService } from '../../services/domain/team.service';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team: TeamDTO;
  teamImage;
  inviteds: InvitationDTO[];
  members: string = "enrolled";
  isOwner: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public teamService: TeamService,
    public modalCtrl: ModalController) {
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

    this.teamImage = `assets/imgs/${this.team.imageUrl || 'team-blank.jpg'}`;
    this.teamService.findInvitations(this.team.id)
    .subscribe(response => {
      this.inviteds = response;
    })
  }

  inviteRowers() {
    const modal = this.modalCtrl.create('InvitationNewPage');
    modal.present();
  }

}
