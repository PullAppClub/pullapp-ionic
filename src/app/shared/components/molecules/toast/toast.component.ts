import { Component } from '@angular/core';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { ToastType } from '../../../../core/enums/toast.enum';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  public toastType = ToastType;
  constructor(public readonly toastService: ToastService) {}
}
