import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RowerService } from '../../services/domain/rower.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  formGroup: FormGroup;
  show: boolean = false;
  passwordInputType: string = 'password';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public rowerService: RowerService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.required]],
        isSteerer: [false]
      });
      
  }

  signupUser() {
    this.rowerService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk()
    },
    error => {});
  }
  
  showInsertOk(): any {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Registro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  toggleShow(event){

    this.show = !(this.show);
    this.passwordInputType = this.show ? 'text' : 'password';
  }

}
