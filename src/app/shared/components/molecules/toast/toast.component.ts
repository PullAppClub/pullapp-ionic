import { Component } from '@angular/core';
import { ToastService } from '../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  constructor(public readonly toastService: ToastService) {}
}
