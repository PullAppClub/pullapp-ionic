import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [HeaderComponent, ToastComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, ToastComponent],
})
export class SharedModule {}
