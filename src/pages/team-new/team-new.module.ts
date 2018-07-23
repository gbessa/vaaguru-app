import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamNewPage } from './team-new';

@NgModule({
  declarations: [
    TeamNewPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamNewPage),
  ],
})
export class TeamNewPageModule {}
