import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminChallengeRevisionComponent } from './pages/admin-challenge-revision/admin-challenge-revision.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'challenge-revision',
    pathMatch: 'full',
  },
  {
    path: 'challenge-revision',
    component: AdminChallengeRevisionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
