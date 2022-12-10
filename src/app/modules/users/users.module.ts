import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { UsersRoutingModule } from './users-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { IonicModule } from '@ionic/angular';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    RegistrationDetailsComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    IonicModule,
    SharedModule,
    FormsModule,
  ],
  providers: [UserAuthService],
})
export class UsersModule {}
