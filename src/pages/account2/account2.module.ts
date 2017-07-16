import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Account2Page } from './account2';

@NgModule({
  declarations: [
    Account2Page,
  ],
  imports: [
    IonicPageModule.forChild(Account2Page),
  ],
  exports: [
    Account2Page
  ]
})
export class Account2PageModule {}
