import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';
import { HomeEventsComponent } from './pages/home-events/home-events.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EventsPageRoutingModule],
  declarations: [HomeEventsComponent],
})
export class EventsPageModule {}
