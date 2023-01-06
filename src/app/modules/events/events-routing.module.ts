import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeEventsComponent } from './pages/home-events/home-events.component';
import { SpotsMapComponent } from './pages/spots-map/spots-map.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeEventsComponent,
  },
  {
    path: 'map',
    component: SpotsMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
