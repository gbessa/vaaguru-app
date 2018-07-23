import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-team-new',
  templateUrl: 'team-new.html',
})
export class TeamNewPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public formBuilder: FormBuilder,
    public navParams: NavParams) {

      this.formGroup = this.formBuilder.group({
        name: [null, [Validators.required]],
        description: [null, Validators.required],
        imageUrl: [null, null]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamNewPage');
  }

}
