import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminChallengeRevisionComponent } from './pages/admin-challenge-revision/admin-challenge-revision.component';
import { authenticationGuard } from '../../core/guards/authentication/authentication.guard';
import { authorizationGuard } from '../../core/guards/authorization/authorization.guard';
import { Role } from '../users/enums/role.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'challenge-revision',
    pathMatch: 'full',
  },
  {
    path: 'challenge-revision',
    component: AdminChallengeRevisionComponent,
    canActivate: [authenticationGuard, authorizationGuard],
    data: {
      allowedRoles: [Role.Admin],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
