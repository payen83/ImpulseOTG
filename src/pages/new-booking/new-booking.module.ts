import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBookingPage } from './new-booking';

@NgModule({
  declarations: [
    NewBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBookingPage),
  ],
  exports: [
    NewBookingPage
  ]
})
export class NewBookingPageModule {}
