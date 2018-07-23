import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RowerDTO } from '../../models/rower.dto';
import { RowerService } from '../../services/domain/rower.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  rower: RowerDTO;
  localUser: any;
  profileImage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public rowerService: RowerService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    this.rowerService.findMe()
    .subscribe(response => {
      console.log(response)
      this.rower = response as RowerDTO;
      this.profileImage = `assets/imgs/${this.rower.imageUrl}`
    })
  }

}
