import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Bookings } from './bookings';

@NgModule({
  declarations: [
    Bookings,
  ],
  imports: [
    IonicPageModule.forChild(Bookings),
  ],
  exports: [
    Bookings
  ]
})
export class BookingsModule {}
