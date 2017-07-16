import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Performance } from './performance';

@NgModule({
  declarations: [
    Performance,
  ],
  imports: [
    IonicPageModule.forChild(Performance),
  ],
  exports: [
    Performance
  ]
})
export class PerformanceModule {}
