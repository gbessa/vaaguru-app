import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ScheduleDTO } from '../../models/schedule.dto';
import { InscriptionDTO } from '../../models/inscription.dto';
import { InscriptionService } from '../../services/domain/inscription.service';
import { StorageService } from '../../services/storage.service';
import { ScheduleService } from '../../services/domain/schedule.service';

@IonicPage()
@Component({
  selector: 'page-schedule-detail',
  templateUrl: 'schedule-detail.html',
})
export class ScheduleDetailPage {

  item: ScheduleDTO;
  inscriptions: InscriptionDTO[];
  isCurrRowerInList: boolean;
  isTeamOwner: boolean;
  localUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public inscriptionService: InscriptionService,
    public scheduleService: ScheduleService,
    public storage: StorageService,
    private alertCtrl: AlertController) {
      this.localUser = this.storage.getLocalUser();
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    this.loadData();
  }

  loadData() {
    this.isCurrRowerInList = false;
    this.isTeamOwner = false;

    this.item.team.owners.map(owner => {
      if (owner.email === this.localUser.email) {
        this.isTeamOwner = true;
      }
    })
    
    if (this.item === undefined) {
      this.navCtrl.setRoot('HomePage');
      return
    }
    this.inscriptionService.findAll(this.item.id)
      .subscribe(response => {
        this.inscriptions = response;
        this.inscriptions.map(inscription => {
          if (inscription.rower.email === this.localUser.email) {
            this.isCurrRowerInList = true;
          }
        })        
      },
        error => {
          console.log('Error !! Load Data');
        })
  }

  confirmInscription() {
    const newInscription: any = {
      rower_email: this.localUser.email,
      schedule_id: this.item.id
    };
    this.inscriptionService.insert(newInscription)
      .subscribe(response => {
        this.loadData();
      },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        })
  }

  runRemoveInscription() {
    
    let inscription: InscriptionDTO[] = this.inscriptions.filter(inscription => inscription.rower.email === this.localUser.email);
    this.inscriptionService.remove(inscription[0])
      .subscribe(response => {
        this.loadData();
      },
      error => {
        console.log(error)
      }
    )
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }  

  removeInscription() {
    let alert = this.alertCtrl.create({
      title: 'Confirma',
      message: 'Deseja realmente tirar o nome da Lista?',
      buttons: [
        {
          text: 'NÃO'
        },
        {
          text: 'SIM',
          handler: () => {
            this.runRemoveInscription();
          }
        }
      ]
    });
    alert.present();
  }

  removeSchedule() {
    let alert = this.alertCtrl.create({
      title: 'Confirma',
      message: 'Deseja realmente EXCLUIR esta agenda?',
      buttons: [
        {
          text: 'NÃO'
        },
        {
          text: 'SIM',
          handler: () => {
            this.runRemoveSchedule();
          }
        }
      ]
    });
    alert.present();
  }

  runRemoveSchedule() {
    
    this.scheduleService.remove(this.item)
      .subscribe(response => {
        this.navCtrl.setRoot('SchedulesPage');
      },
      error => {
        console.log(error)
      }
    )
  }

}
