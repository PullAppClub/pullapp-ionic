import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminChallengeRevisionComponent } from './pages/admin-challenge-revision/admin-challenge-revision.component';
import { AdminRoutingModule } from './admin-routing.module';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AdminChallengeService } from './services/admin-challenge/admin-challenge.service';

@NgModule({
  declarations: [AdminChallengeRevisionComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule,
    SharedModule,
    TranslateModule,
  ],
})
export class AdminModule {}
