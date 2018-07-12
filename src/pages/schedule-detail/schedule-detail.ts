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
    this.item = this.navParams.get('item');
    console.log('buscando por......', this.item.id);
    this.inscriptionService.findAll(this.item.id)
    .subscribe(response => {
      this.inscriptions = response;
    },
    error => {})
  }

}
