import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the NewBookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-booking',
  templateUrl: 'new-booking.html',
})
export class NewBookingPage {

	title: string;
	studioDisable: boolean;
	studioList: Array<any>;
	country: string;
  bookingDate: any;

  constructor(public datePicker: DatePicker, public navCtrl: NavController, public navParams: NavParams, public bookingProvider: BookingProvider) {
  	this.title = this.navParams.get('title');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NewBookingPage');
    this.studioDisable = true;
  }

  countrySelected(country: string){
  	this.studioDisable = false;
  	this.studioList = this.bookingProvider.getStudioList(country);
  	//console.log(this.studioList);
  	//alert(this.studioDisable);
  }

   changeDate(){

    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.bookingDate = date,
      err => console.log('Error occurred while getting date: ', err)
    );

  }



}
