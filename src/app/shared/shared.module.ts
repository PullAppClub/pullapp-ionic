import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/organisms/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ToastComponent } from './components/molecules/toast/toast.component';
import { ChallengeCardComponent } from './components/molecules/challenge-card/challenge-card.component';
import { TabBarComponent } from './components/organisms/tapbar/tab-bar.component';
import { MapComponent } from './components/organisms/map/map.component';
import { SelectSportComponent } from './components/atoms/select-sport/select-sport.component';
import { SelectLevelComponent } from './components/atoms/select-level/select-level.component';
import { FormsModule } from '@angular/forms';
import { SmallStatCardComponent } from './components/atoms/small-stat-card/small-stat-card.component';
import { AnimatedTabsComponent } from './components/molecules/animated-tabs/animated-tabs.component';
import { LoadMoreButtonComponent } from './components/atoms/load-more-button/load-more-button.component';
import { ChallengeCardMdComponent } from './components/molecules/challenge-card-md/challenge-card-md.component';
import { SpotCardMdComponent } from './components/molecules/spot-card-md/spot-card-md.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ToastComponent,
    ChallengeCardComponent,
    TabBarComponent,
    MapComponent,
    SelectSportComponent,
    SelectLevelComponent,
    SmallStatCardComponent,
    AnimatedTabsComponent,
    LoadMoreButtonComponent,
    ChallengeCardMdComponent,
    SpotCardMdComponent,
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
    SmallStatCardComponent,
    AnimatedTabsComponent,
    LoadMoreButtonComponent,
    ChallengeCardMdComponent,
    SpotCardMdComponent,
  ],
})
export class SharedModule {}
