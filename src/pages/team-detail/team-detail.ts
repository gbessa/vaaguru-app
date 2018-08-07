import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TeamDTO } from '../../models/team.dto';
import { InvitationDTO } from '../../models/invitation.dto';
import { TeamService } from '../../services/domain/team.service';
import { RowerDTO } from '../../models/rower.dto';
import { StorageService } from '../../services/storage.service';

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
  localUser: any;
  isOwner: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public teamService: TeamService,
    public modalCtrl: ModalController,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.get('item');
    this.localUser = this.storage.getLocalUser();
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
    },
    error => {});

    this.team.owners.map(rower => {
      if (rower.email === this.localUser.email) this.isOwner = true
    });

  }

  inviteRowers() {
    const modal = this.modalCtrl.create('InvitationNewPage', {teamId: this.team.id});
    modal.present();
  }


  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  } 

}
