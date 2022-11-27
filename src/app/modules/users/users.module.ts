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

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    IonicModule,
    SharedModule,
  ],
  providers: [UserAuthService],
})
export class UsersModule {}
