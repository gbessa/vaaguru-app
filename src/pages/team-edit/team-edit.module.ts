import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamEditPage } from './team-edit';

@NgModule({
  declarations: [
    TeamEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamEditPage),
  ],
})
export class TeamEditPageModule {}
