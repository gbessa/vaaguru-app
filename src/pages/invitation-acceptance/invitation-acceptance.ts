import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { InvitationDTO } from '../../models/invitation.dto';
import { InvitationService } from '../../services/domain/invitation.service';

@IonicPage()
@Component({
  selector: 'page-invitation-acceptance',
  templateUrl: 'invitation-acceptance.html',
})
export class InvitationAcceptancePage {

  invitations: InvitationDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public invitationService: InvitationService,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.invitations = this.navParams.get('invitations');
    //this.loadData();
  }

  accept(invitation: InvitationDTO) {
    console.log('accept', invitation)
    this.invitationService.accept(invitation)
    .subscribe(response => {
      this.presentToast('Parabéns! Agora você faz parte da equipe ' + invitation.team_name);
      this.dismiss();
    },
    error => {});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
