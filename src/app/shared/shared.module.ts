import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ToastComponent } from './components/toast/toast.component';
import { ChallengeCardComponent } from './components/challenge-card/challenge-card.component';
import { TabBarComponent } from './components/tapbar/tab-bar.component';
import { MapComponent } from './components/map/map.component';
import { SelectSportComponent } from './components/select-sport/select-sport.component';
import { SelectLevelComponent } from './components/select-level/select-level.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    ToastComponent,
    ChallengeCardComponent,
    TabBarComponent,
    MapComponent,
    SelectSportComponent,
    SelectLevelComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [
    HeaderComponent,
    ToastComponent,
    ChallengeCardComponent,
    TabBarComponent,
    MapComponent,
    SelectSportComponent,
    SelectLevelComponent,
  ],
})
export class SharedModule {}
