import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { UsersRoutingModule } from './users-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { IonicModule } from '@ionic/angular';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationDetailsComponent } from './pages/registration-details/registration-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HallOfFameComponent } from './pages/hall-of-fame/hall-of-fame.component';

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    RegistrationDetailsComponent,
    UserProfileComponent,
    SettingsComponent,
    HallOfFameComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserAuthService],
})
export class UsersModule {}
