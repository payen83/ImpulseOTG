import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewBookingPage } from '../new-booking/new-booking';
import { BookingDetailsPage } from '../booking-details/booking-details';

/**
 * Generated class for the Bookings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class Bookings {

	newBooking: any = NewBookingPage;
	bookingDetails: any = BookingDetailsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Bookings');
  }

  newBookingPage(){
  	this.navCtrl.push(NewBookingPage, {
  		title: 'New Booking'
  	})
  }

}
