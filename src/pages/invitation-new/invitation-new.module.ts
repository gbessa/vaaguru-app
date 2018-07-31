import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationNewPage } from './invitation-new';

@NgModule({
  declarations: [
    InvitationNewPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationNewPage),
  ],
})
export class InvitationNewPageModule {}
