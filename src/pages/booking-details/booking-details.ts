import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NewBookingPage } from '../new-booking/new-booking';
import { BookingDetailsPopoverPage } from '../booking-details-popover/booking-details-popover';

/**
 * Generated class for the BookingDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-booking-details',
  templateUrl: 'booking-details.html',
})
export class BookingDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BookingDetailsPage');
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(BookingDetailsPopoverPage);
    popover.present({ ev: event });
  }

  editBooking(){
  	this.navCtrl.push(NewBookingPage, {
  		title: 'Edit Booking'
  	})
  }

}
