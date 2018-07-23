import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleNewPage } from './schedule-new';

@NgModule({
  declarations: [
    ScheduleNewPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleNewPage),
  ],
})
export class ScheduleNewPageModule {}
