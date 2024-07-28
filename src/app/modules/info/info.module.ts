import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoRoutingModule } from './info-routing.module';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
    IonicModule,
    SharedModule,
    LottieComponent,
  ],
})
export class InfoModule {}
