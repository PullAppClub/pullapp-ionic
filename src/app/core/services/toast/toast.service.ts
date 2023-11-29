import { Injectable } from '@angular/core';
import { ToastType } from '../../enums/toast.enum';

interface ShowToastParams {
  title: string;
  message: string;
  time?: number;
  type: ToastType;
}

/**
 * @description Toast service for showing toast messages.
 *
 * How to use:
 * @example this.toastService.showToast({
 *            msg: 'Login successful',
 *            type: ToastType.Success,
 *            title: 'Login',
 *       });
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toastOnScreen: boolean = false;
  public title: string = '';
  public msg: string = '';
  public type: ToastType | undefined;

  public showToast(params: ShowToastParams): void {
    this.title = params.title;
    this.msg = params.message;
    this.toastOnScreen = true;
    this.type = params.type;

    setTimeout(() => {
      this.toastOnScreen = false;
    }, params.time || 3000);
  }
}
