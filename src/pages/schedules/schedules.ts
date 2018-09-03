import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ScheduleService } from '../../services/domain/schedule.service';
import { ScheduleDTO } from '../../models/schedule.dto';
import { TeamService } from '../../services/domain/team.service';
import { TeamDTO } from '../../models/team.dto';
import { StatusBar } from '@ionic-native/status-bar';
import { InvitationService } from '../../services/domain/invitation.service';
import { InvitationDTO } from '../../models/invitation.dto';

@IonicPage()
@Component({
  selector: 'page-schedules',
  templateUrl: 'schedules.html',
})
export class SchedulesPage {

  items: ScheduleDTO[];
  ownedTeams: TeamDTO[];
  invitationsPending: InvitationDTO[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public scheduleService: ScheduleService,
    public teamService: TeamService,
    public modalCtrl: ModalController,
    public invitationService: InvitationService,
    private statusBar: StatusBar) {

      // let status bar overlay webview
      //this.statusBar.overlaysWebView(true);

      // set status bar to white
      this.statusBar.backgroundColorByHexString('#4B4E6D');
      this.statusBar.show();
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    this.scheduleService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {})

    this.invitationService.findInvitationsToMe()
      .subscribe(response => {
        this.invitationsPending = response;
        if (this.invitationsPending.length > 0) {
          setTimeout(openInvitationAcceptace, 2000, this.modalCtrl, this.invitationsPending);
        }
      },
      error => {})

    this.teamService.findOwned()
    .subscribe(response => {
      this.ownedTeams = response;
    },
    error => {})
  }

  showDetail(item: ScheduleDTO) {
    this.navCtrl.push('ScheduleDetailPage', {
      item: item
    })
  }  

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  } 
  
  
}

function openInvitationAcceptace(modalCtrl, invitations) {
  const modal = modalCtrl.create('InvitationAcceptancePage', {invitations: invitations});
  modal.present();
}