import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InvitationDTO } from '../../models/invitation.dto';
import { StorageService } from '../../services/storage.service';
import { InvitationService } from '../../services/domain/invitation.service';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-invitation-new',
  templateUrl: 'invitation-new.html',
})
export class InvitationNewPage {

  formGroup: FormGroup;
  localUser: any;
  teamId: number;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public storage: StorageService,
    public invitationService: InvitationService,
    private toastCtrl: ToastController) {

      this.localUser = this.storage.getLocalUser();

      this.formGroup = this.formBuilder.group({
        invited_email: [null, [Validators.required, Validators.email]]
      });

  }

  ionViewDidLoad() {
  }

  sendInvitation(email: string) {
    let obj: InvitationDTO = this.formGroup.value;
    obj.inviter_email = this.localUser.email;
    obj.team_id = this.navParams.get('teamId');
    obj.status = 1;
    this.invitationService.insert(obj)
    .subscribe(response => {
      this.presentToast('O convite foi enviado com sucesso!!');
      this.dismiss();
    },
    error => {
      
    });
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
