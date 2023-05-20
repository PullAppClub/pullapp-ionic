import { ToastService } from '../../services/toast/toast.service';
import { LangService } from '../../services/lang/lang.service';
import { RequestHelper } from '../request/request.helper';
import { Injectable } from '@angular/core';
import { ToastType } from '../../enums/toast.enum';
import { Error } from '../../interfaces/error.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerHelper {
  constructor(
    private readonly toastService: ToastService,
    private readonly langService: LangService,
    private readonly requestHelper: RequestHelper
  ) {}

  public async handle(params: Error): Promise<void> {
    console.log(params);

    const key = this.requestHelper.getErrorMessage(params);
    const msg = await this.langService.t(key);

    this.toastService.showToast({
      msg,
      title: 'Error',
      type: ToastType.Error,
    });
  }
}
