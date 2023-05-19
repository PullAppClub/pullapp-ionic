import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';
import { HomeEventsComponent } from './pages/home-events/home-events.component';
import { SpotsMapComponent } from './pages/spots-map/spots-map.component';
import { SharedModule } from '../../shared/shared.module';
import { ChallengeComponent } from './pages/challenge/challenge.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    SharedModule,
  ],
  declarations: [HomeEventsComponent, SpotsMapComponent, ChallengeComponent],
})
export class EventsPageModule {}
