import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminChallengeRevisionComponent } from './pages/admin-challenge-revision/admin-challenge-revision.component';
import { EventsPageRoutingModule } from './admin-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AdminChallengeRevisionComponent],
  imports: [CommonModule, EventsPageRoutingModule, IonicModule, SharedModule],
})
export class AdminModule {}
