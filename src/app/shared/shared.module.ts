import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ToastComponent } from './components/toast/toast.component';
import { ChallengeCardComponent } from './components/challenge-card/challenge-card.component';
import { TabBarComponent } from './components/tapbar/tab-bar.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ToastComponent,
    ChallengeCardComponent,
    TabBarComponent,
    MapComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    HeaderComponent,
    ToastComponent,
    ChallengeCardComponent,
    TabBarComponent,
    MapComponent,
  ],
})
export class SharedModule {}
