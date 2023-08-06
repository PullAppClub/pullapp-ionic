import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';
import { HomeEventsComponent } from './pages/home-events/home-events.component';
import { SpotsMapComponent } from './pages/spots-map/spots-map.component';
import { SharedModule } from '../../shared/shared.module';
import { ChallengeComponent } from './pages/challenge/challenge.component';
import { CreateChallengeComponent } from './pages/create-challenge/create-challenge.component';
import { TranslateModule } from '@ngx-translate/core';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    LottieComponent,
  ],
  declarations: [
    HomeEventsComponent,
    SpotsMapComponent,
    ChallengeComponent,
    CreateChallengeComponent,
  ],
})
export class EventsPageModule {}
