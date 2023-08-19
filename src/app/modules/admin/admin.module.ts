import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminChallengeRevisionComponent } from './pages/admin-challenge-revision/admin-challenge-revision.component';
import { EventsPageRoutingModule } from './admin-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AdminChallengeRevisionComponent],
  imports: [
    CommonModule,
    EventsPageRoutingModule,
    IonicModule,
    SharedModule,
    TranslateModule,
  ],
})
export class AdminModule {}
