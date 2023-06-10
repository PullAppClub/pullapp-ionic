import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { RegistrationDetailsComponent } from './pages/registration-details/registration-details.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthenticationGuard } from '../../core/guards/authentication/authentication.guard';
import { HallOfFameComponent } from './pages/hall-of-fame/hall-of-fame.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { ChangeEmailComponent } from './pages/change-email/change-email.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'registration-details',
    component: RegistrationDetailsComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'settings/personal-info',
    component: PersonalInfoComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'settings/change-email',
    component: ChangeEmailComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'settings/change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'hall-of-fame',
    component: HallOfFameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
