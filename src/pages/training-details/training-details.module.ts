import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainingDetailsPage } from './training-details';

@NgModule({
  declarations: [
    TrainingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingDetailsPage),
  ],
  exports: [
    TrainingDetailsPage
  ]
})
export class TrainingDetailsPageModule {}
