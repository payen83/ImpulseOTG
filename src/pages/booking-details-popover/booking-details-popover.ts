import { Component } from '@angular/core';

import { App, NavController, ViewController, AlertController } from 'ionic-angular';


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="update()">Edit Booking</button>
      <button ion-item (click)="cancel()">Cancel Booking</button>
    </ion-list>
  `
})
export class BookingDetailsPopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public alertCtrl: AlertController
  ) { }

  support() {
    this.app.getRootNav().push('SupportPage');
    this.viewCtrl.dismiss();
  }

  update(){
    //this.app.getRootNav().push('SupportPage');

    this.app.getRootNav().push('NewBookingPage', {
      title: 'Edit Booking'
    })

    this.viewCtrl.dismiss();

  }

  cancel(){

    this.viewCtrl.dismiss();

    let confirm = this.alertCtrl.create({
      title: 'Booking Cancellation',
      message: 'Are you sure you want to cancel this booking?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');    
          }
        }
      ]
    });
    confirm.present();

  }

}