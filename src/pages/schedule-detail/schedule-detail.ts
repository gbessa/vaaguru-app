import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScheduleDTO } from '../../models/schedule.dto';
import { InscriptionDTO } from '../../models/inscription.dto';
import { InscriptionService } from '../../services/domain/inscription.service';

@IonicPage()
@Component({
  selector: 'page-schedule-detail',
  templateUrl: 'schedule-detail.html',
})
export class ScheduleDetailPage {

  item: ScheduleDTO;
  inscriptions: InscriptionDTO[];
  nome: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public inscriptionService: InscriptionService) {
    }
    
    ionViewDidLoad() {
      this.loadData();
    }
    
    loadData() {
      this.item = this.navParams.get('item');
      this.inscriptionService.findAll(this.item.id)
      .subscribe(response => {
        this.inscriptions = response;
      },
      error => {})
    }
    
    confirmInscription() {
    const newInscription: any = {
      rower_id: 1,
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

}
