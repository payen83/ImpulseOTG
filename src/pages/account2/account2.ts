import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


/**
 * Generated class for the Account2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account2',
  templateUrl: 'account2.html',
})
export class Account2Page {

	eName: string;
	ePhone: string;
	weight: string;
	height: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Account2Page');
  }

  changeEmergencyName(){

    let alert = this.alertCtrl.create({
      title: 'Change Emergency Contact Name',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'eName',
      value: this.eName,
      placeholder: 'Name'
    });
    alert.addButton({
      text: 'OK',
      handler: (data: any) => {
        //this.userData.setUsername(data.username);
        //this.getUsername();
      }
    });

    alert.present();

  }

  changeEmergencyPhone(){

    let alert = this.alertCtrl.create({
      title: 'Change Emergency Contact Number',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'icNo',
      value: this.ePhone,
      placeholder: 'Phone Number'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        //this.userData.setUsername(data.username);
        //this.getUsername();
      }
    });

    alert.present();

  }

  changeWeight(){

    let alert = this.alertCtrl.create({
      title: 'Change Weight',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'weight',
      value: this.weight,
      placeholder: 'Weight'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        //this.userData.setUsername(data.username);
        //this.getUsername();
      }
    });

    alert.present();

  }

  changeHeight(){

    let alert = this.alertCtrl.create({
      title: 'Change Height',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'height',
      value: this.height,
      placeholder: 'Height'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        //this.userData.setUsername(data.username);
        //this.getUsername();
      }
    });

    alert.present();

  }


}
