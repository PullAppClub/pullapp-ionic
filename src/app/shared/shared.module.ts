import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './components/organisms/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ToastComponent } from './components/molecules/toast/toast.component';
import { ChallengeCardComponent } from './components/organisms/challenge-card/challenge-card.component';
import { TabBarComponent } from './components/organisms/tapbar/tab-bar.component';
import { MapComponent } from './components/organisms/map/map.component';
import { SelectSportComponent } from './components/atoms/select-sport/select-sport.component';
import { SelectLevelComponent } from './components/atoms/select-level/select-level.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmallStatCardComponent } from './components/atoms/small-stat-card/small-stat-card.component';
import { AnimatedTabsComponent } from './components/molecules/animated-tabs/animated-tabs.component';
import { LoadMoreButtonComponent } from './components/atoms/load-more-button/load-more-button.component';
import { ChallengeCardMdComponent } from './components/molecules/challenge-card-md/challenge-card-md.component';
import { SpotCardMdComponent } from './components/molecules/spot-card-md/spot-card-md.component';
import { GalleryModule } from 'ng-gallery';
import { SponsoredChallengeCardComponent } from './components/molecules/sponsored-challenge-card/sponsored-challenge-card.component';
import { EntryRewardComponent } from './components/atoms/entry-reward/entry-reward.component';
import { LoadButtonComponent } from './components/atoms/load-button/load-button.component';
import { UploadModalComponent } from './components/molecules/upload-modal/upload-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarComponent } from './components/atoms/progress-bar/progress-bar.component';
import { NgProgressComponent } from 'ngx-progressbar';
import { VideoPlayerModalComponent } from './components/molecules/video-player-modal/video-player-modal.component';
import { TextModalComponent } from './components/molecules/text-modal/text-modal.component';
import { LottieComponent } from 'ngx-lottie';
import { SpinnerComponent } from './components/atoms/spinner/spinner.component';
import { AvatarGroupComponent } from './components/molecules/avatar-group/avatar-group.component';
import { ChallengeParticipantsListModalComponent } from './components/molecules/challenge-participants-list-modal/challenge-participants-list-modal.component';
import { ChallengeAvatarGroupComponent } from './components/organisms/challenge-avatar-group/challenge-avatar-group.component';
import { VideoInputComponent } from './components/atoms/video-input/video-input.component';
import { VideoContainerComponent } from './components/organisms/video-container/video-container.component';
import { WarningModalComponent } from './components/molecules/warning-modal/warning-modal.component';
import { StoresButtonComponent } from './components/atoms/stores-button/stores-button.component';
import { InfoNavbarComponent } from './components/organisms/info-navbar/info-navbar.component';
import { ChallengeTypeSelectorComponent } from './components/molecules/challenge-type-selector/challenge-type-selector.component';
import { ChallengePricingComponent } from './components/molecules/challenge-pricing/challenge-pricing.component';
import { RouterLink } from '@angular/router';

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
    SponsoredChallengeCardComponent,
    EntryRewardComponent,
    LoadButtonComponent,
    UploadModalComponent,
    ProgressBarComponent,
    VideoPlayerModalComponent,
    TextModalComponent,
    SpinnerComponent,
    AvatarGroupComponent,
    ChallengeParticipantsListModalComponent,
    ChallengeAvatarGroupComponent,
    VideoInputComponent,
    VideoContainerComponent,
    WarningModalComponent,
    StoresButtonComponent,
    InfoNavbarComponent,
    ChallengeTypeSelectorComponent,
    ChallengePricingComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    GalleryModule,
    TranslateModule,
    NgProgressComponent,
    ReactiveFormsModule,
    LottieComponent,
    NgOptimizedImage,
    RouterLink,
  ],
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
    SponsoredChallengeCardComponent,
    EntryRewardComponent,
    LoadButtonComponent,
    UploadModalComponent,
    ProgressBarComponent,
    VideoPlayerModalComponent,
    TextModalComponent,
    SpinnerComponent,
    AvatarGroupComponent,
    ChallengeParticipantsListModalComponent,
    ChallengeAvatarGroupComponent,
    VideoInputComponent,
    VideoContainerComponent,
    WarningModalComponent,
    StoresButtonComponent,
    InfoNavbarComponent,
    ChallengeTypeSelectorComponent,
    ChallengePricingComponent,
  ],
})
export class SharedModule {}
