import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Credit } from './credit';

@NgModule({
  declarations: [
    Credit,
  ],
  imports: [
    IonicPageModule.forChild(Credit),
  ],
  exports: [
    Credit
  ]
})
export class CreditModule {}
