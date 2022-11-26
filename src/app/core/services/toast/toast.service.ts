import { Injectable } from '@angular/core';
import { ToastType } from '../../enums/toast.enum';

interface ShowToastParams {
  title: string;
  msg: string;
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
  private _toastOnScreen: boolean = false;
  private _title: string = '';
  private _msg: string = '';
  private _type: ToastType | undefined;

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
  public get msg(): string {
    return this._msg;
  }
  public set msg(value: string) {
    this._msg = value;
  }

  public get toastOnScreen(): boolean {
    return this._toastOnScreen;
  }
  public set toastOnScreen(value: boolean) {
    this._toastOnScreen = value;
  }

  get type(): ToastType {
    return this._type as ToastType;
  }

  set type(value: ToastType) {
    this._type = value;
  }

  public showToast(params: ShowToastParams): void {
    this.title = params.title;
    this.msg = params.msg;
    this.toastOnScreen = true;
    this.type = params.type;

    setTimeout(() => {
      this.toastOnScreen = false;
    }, params.time || 3000);
  }
}
