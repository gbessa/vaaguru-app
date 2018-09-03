import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationAcceptancePage } from './invitation-acceptance';

@NgModule({
  declarations: [
    InvitationAcceptancePage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationAcceptancePage),
  ],
})
export class InvitationAcceptancePageModule {}
